const glob = require('glob');
const fs = require('fs');
const path = require('path');
const pkg = require('./package');
const _ = require('lodash');
const NetlifyServerPushPlugin = require('./lib/NetlifyServerPushPlugin');

const nodeExternals = require('webpack-node-externals');
let publicURL = 'http://localhost:3000';

switch (process.env.CONTEXT) {
  case 'production':
    publicURL = process.env.URL;
    break;
  case 'branch-deploy':
    publicURL = process.env.URL.replace('://', `://${process.env.BRANCH}.`);
    break;
  case 'deploy-preview':
    publicURL = process.env.DEPLOY_PRIME_URL;
    break;
}

const routes = {
  '/announcement': 'blog/posts/announcements/*.json',
  '/activity': 'blog/posts/activities/*.json',
  '/technology': 'blog/posts/technologies/*.json',
  '/member': 'members/*.json',
};

const brandIcons = _.uniq(
  require('./content/pages/contact.json').social.map(i =>
    _.camelCase(`fa ${i.icon[1]}`)
  )
);

const solidIcons = require('./content/pages/home.json')
  .business.map(i => _.camelCase(`fa ${i.icon[1]}`))
  .concat(['faFax', 'faPhone', 'faBuilding', 'faEnvelope', 'faIndustry']);

module.exports = {
  mode: process.env.NUXT_MODE || 'universal',
  dev: process.env.NODE_ENV !== 'production',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name.toUpperCase(),
    titleTemplate: '%s - ' + pkg.name.toUpperCase(),
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"preconnect", href:"https://fonts.gstatic.com/", crossorigin: true },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#212121' },
  loadingIndicator: {
    name: 'circle',
    color: 'red',
  },

  /*
  ** Route config for pre-rendering
  */
  generate: {
    fallback: true,
    routes: getDynamicPaths(routes),
  },

  /*
  ** Global CSS
  */
  css: ['@/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/prototypes', '@/plugins/vuetify'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-fontawesome',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap',
  ],

  /*
  ** modules configuration
  */
  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/fontawesome-free-brands',
        icons: _.uniq(brandIcons),
      },
      {
        set: '@fortawesome/fontawesome-free-solid',
        icons: _.uniq(solidIcons),
      },
    ],
  },
  icon: { iconSrc: 'static/images/icon.png' },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.(googleapis|gstatics).com/.*',
        handler: 'cacheFirst',
      },
      {
        urlPattern: 'https://cdnjs.cloudflare.com/.*',
        handler: 'cacheFirst',
      },
      {
        urlPattern: 'https://unpkg.com/.*',
        handler: 'cacheFirst',
      },
    ],
  },
  meta: {
    name: pkg.name.toUpperCase(),
    nativeUI: true,
    ogHost: publicURL,
  },
  sitemap: {
    generate: true,
    hostname: publicURL,
    routes: getDynamicPaths(routes, 'content', true),
  },
  'google-analytics': {
    id: 'UA-114389898-1',
  },

  render: {
    gzip: { threshold: 6 },
    http2: { push: true },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'font') return /.woff2/.test(file)
        return ['script', 'style'].includes(type)
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: publicURL + '/',
    babel: {
      plugins: [
        [
          'transform-imports',
          {
            vuetify: {
              transform: 'vuetify/es5/components/${member}',
              preventFullImport: true,
            },
          },
        ],
      ],
    },
    vendor: ['~/plugins/vuetify.js'],
    extractCSS: false,
    cssSourceMap: false,

    plugins: [
      new NetlifyServerPushPlugin({
        headersFile: '_headers'
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['@fortawesome/fontawesome-free-brands$'] =
        '@fortawesome/fontawesome-free-brands/shakable.es.js';
      config.resolve.alias['@fortawesome/fontawesome-free-solid$'] =
        '@fortawesome/fontawesome-free-solid/shakable.es.js';
      if (ctx.isDev) {
        config.module.rules.push({
          test: /\.(gif|jpe?g|png|svg|tiff|webp)$/,
          use: [
            {
              loader: 'image-process-loader',
              options: {
                jpeg: {
                  progressive: true,
                  blur: true,
                },
                png: {
                  progressive: true,
                  blur: true,
                },
              },
            },
          ],
        });
        // Run ESLint on save
        if (ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/,
          });
        }
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ];
      }
    },
  },
};

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable, cwd = 'content', sitemap = false) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(uri => {
      const filepathGlob = urlFilepathTable[uri];
      return glob.sync(filepathGlob, { cwd }).map(filepath => {
        const url = `${uri}/${path.basename(filepath, '.json')}`;
        if (sitemap) {
          return {
            lastmodISO: fs.statSync(path.join(cwd, filepath)).mtime,
            changefreq: 'daily',
            url,
          };
        }

        return url;
      });
    })
  );
}
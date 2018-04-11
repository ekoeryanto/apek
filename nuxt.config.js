const glob = require('glob');
const path = require('path');
const pkg = require('./package')
const _ = require('lodash');

const nodeExternals = require('webpack-node-externals')

const dynamicRoutes = getDynamicPaths({
  '/announcement': 'blog/posts/announcements/*.json',
  '/activity': 'blog/posts/activities/*.json',
  '/technology': 'blog/posts/technologies/*.json',
});

const brandIcons = _.uniq(
  require('./content/pages/contact.json')
  .social
    .map(i => _.camelCase(`fa ${i.icon}`))
)

const solidIcons = require('./content/pages/home.json')
  .business
  .map(i => _.camelCase(`fa ${i.icon}`))
  .concat(['faFax', 'faPhone', 'faBuilding', 'faEnvelope', 'faIndustry'])



module.exports = {
  mode: 'universal',
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
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"},
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#212121' },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'red'
  },

  /*
  ** Route config for pre-rendering
  */
  generate: {
    routes: dynamicRoutes
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/prototypes',
    '@/plugins/persisted-state',
    '@/plugins/vuetify',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-fontawesome',
    '@nuxtjs/pwa',
  ],

  /*
  ** modules configuration
  */
  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/fontawesome-free-brands',
        icons: _.uniq(brandIcons)
      },
      {
        set: '@fortawesome/fontawesome-free-solid',
        icons: _.uniq(solidIcons)
      }
    ]
  },
  icon: { iconSrc: 'static/images/icon.png'},
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.(googleapis|gstatics).com/.*',
        handler: 'cacheFirst'
      },
      {
        urlPattern: 'https://cdnjs.cloudflare.com/.*',
        handler: 'cacheFirst'
      }
    ]
  },
  meta: {
    name: pkg.name.toUpperCase(),
    nativeUI: true,
    ogHost: process.env.URL ? process.env.URL.replace('https://', '') : 'localhost:3000'
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/rsc/',
    babel: {
      plugins: [
        [
          'transform-imports',
          {
            vuetify: {
              transform: 'vuetify/es5/components/${member}',
              preventFullImport: true
            }
          }
        ]
      ]
    },
    vendor: ['~/plugins/vuetify.js'],
    extractCSS: true,
    cssSourceMap: false,

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['@fortawesome/fontawesome-free-brands$'] = '@fortawesome/fontawesome-free-brands/shakable.es.js'
      config.resolve.alias['@fortawesome/fontawesome-free-solid$'] = '@fortawesome/fontawesome-free-solid/shakable.es.js'
      if (ctx.isDev) {
        config.module.rules.push({
          test: /\.(gif|jpe?g|png|svg|tiff|webp)$/,
          use: [
            {
              loader: 'image-process-loader',
              options: {
                jpeg: {
                  progressive: true,
                  blur: true
                },
                png: {
                  progressive: true,
                  blur: true
                }
              }
            }
          ]
        })
        // Run ESLint on save
        if (ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable, cwd = 'content') {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      const filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
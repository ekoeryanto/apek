var glob = require('glob');
var path = require('path');
const nodeExternals = require('webpack-node-externals')

// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
var dynamicRoutes = getDynamicPaths({
  '/blog': 'blog/posts/*.json',
  '/member': 'members/*.json'
});

const cdn = []
const css = []

if (process.env.NODE_ENV === 'development') {
  css.concat([
    './node_modules/typeface-roboto/index.css',
    './node_modules/mdi/css/materialdesignicons.css',
  ])
} else {
  cdn.concat([
    'https://cdn.jsdelivr.net/npm/mdi@2.2.43/css/materialdesignicons.min.css',
    'https://cdn.jsdelivr.net/npm/typeface-roboto'
  ])
}

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Asosiasi Pengusaha Engineering Karawang',
    titleTemplate: '%s - APEK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Asosiasi Pengusaha Engineering Karawang' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...cdn.map(x => ({ rel: 'stylesheet', href: x }))
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#F44336' },

  /*
  ** Global CSS
  */
  css: [
    ...css,
    '@/assets/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit'
  ],

  /*
  ** modules configuration
  */

  icon: {
    iconSrc: 'static/images/uploads/icon.png'
  },
  workbox: {
    runtimeCaching: [
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: 'http://cdn.jsdelivr.net/.*',
        // Defaults to `networkFirst` if omitted
        handler: 'cacheFirst',
        // Defaults to `GET` if omitted
        method: 'GET'
      }
    ]
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use: [
      'markdown-it-container',
      'markdown-it-attrs'
    ]
  },

  /*
  ** Route config for pre-rendering
  */
  generate: {
    routes: dynamicRoutes
  },

  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },

    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
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
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
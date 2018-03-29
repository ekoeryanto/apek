const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  analyze: true,
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#212121' },

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
    '@/plugins/vuetify',
    { src: '~/plugins/typer', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa'
  ],

  /*
  ** modules configuration
  */
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    typographer:  false,
    injected: true
  },
  icon: { iconSrc: 'static/images/icon.png'},
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.(googleapis|gstatics).com/.*',
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
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/, /^vue-material-design-icons/]
          })
        ]
      }
    }
  }
}
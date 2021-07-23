
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    'quill/dist/quill.snow.css',
    'highlight.js/styles/monokai-sublime.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~/plugins/vue-swiper.js',
      ssr: false
    },
    {
      src: '~plugins/nuxt-quill-plugin.js',
      ssr: false
    },
    {
      src: '~plugins/axios.js',
      ssr: true
    },
    '~plugins/filters.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // prefix: '/api/',
    // proxy: true // Can be also an object with default options
    // proxy: {
    //   '/api/': { target: 'https://shepherdnet.top', pathRewrite: {'^/api/': ''} }
    // },
  },
  /*
  ** Build configuration
  */
  build: {
    // extractCSS: { allChunks: true },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    analyze: true,
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

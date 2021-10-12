module.exports = {
  chainWebpack: config=>{
    config.plugins.delete('prefetch')
  },
  productionSourceMap: false,
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Developer Student Clubs - LPU | Open Recruitment | 2021',
    workboxPluginMode: 'InjectManifest',
    themeColor: '#4285F4',
    msTileColor: '#4285F4',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: "#ffffff"
    },
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
  }
}
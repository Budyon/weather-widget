module.exports = {
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks') // no vendor chunks
    config.plugins.delete('prefetch')         // no prefetch chunks
    config.plugins.delete('preload')          // no preload chunks

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear() 
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader') 
  }
}
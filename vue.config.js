'use strict'
const path = require('path')
const {cdnHost} = require('./secret').cdn

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : cdnHost,
  devServer: {
    port: 80,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  productionSourceMap: false,

  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    // html不压缩，让爬虫识别
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        args[0].title = '100jiancai.cn'
        return args
      })
  },
}

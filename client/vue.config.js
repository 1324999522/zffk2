// vue.config.js
const path = require('path');
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'faviconfc.ico',
      favicon16: 'faviconfc.ico',
      appleTouchIcon: 'faviconfc.ico',
      maskIcon: 'faviconfc.ico',
      msTileImage: 'faviconfc.ico'
    }
  },
  publicPath: '', // 相对于 HTML 页面（目录相同）

  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "192.168.1.6",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个跨域
      "/api": {
        target: "http://192.168.1.6:6200",
        changeOrigin: true, //如果接口跨域，需要进行这个参数配置
        // ws: true,
        secure: false,// 如果是https接口，需要配置这个参数
        pathRewrite: {
          "^/api": ""
        }
      },
      "/api2": {
        target: "https://search.bilibili.com",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api2": ""
        }
      },
    }
  },


}
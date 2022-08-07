module.exports = {
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  /** 设置为true代表可以在浏览器上看源码，打包时一定要改成false */
  productionSourceMap: true,
  /** 删除预加载, 做到真正的按需加载 */
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}
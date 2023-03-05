const path = require('path') //node的path模块
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin //打包资源分析
const baseConfig = require('./webpack.common.config')
const isAnalyzer = process.env.ENY_TYPE === 'analyzer'

// 打包性能插件
const analyzerHandle = () => {
  if (isAnalyzer) {
    return new Analyzer()
  }
  return () => {}
}

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/', //指定资源公共地址，本地环境运行时也会加上
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true, //DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求,常用于搭配--host 0.0.0.0使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问
    port: 8081,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'X-Custom-Foo': 'bar111',
    },
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/xhx_middle/*': {
        target: 'http://webevent.61.com/',
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true,
      },
    },
  },
  plugins: [
    analyzerHandle(),
    new HtmlWebpackPlugin({
      template: `./src/main.html`, //只增加了这行
      filename: `index.html`,
    }),
  ],
})

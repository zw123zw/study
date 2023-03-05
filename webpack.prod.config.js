const path = require('path') //node的path模块
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.common.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //清除dist

// 多入口打包
const multiEntry = () => {
  return {
    main: path.resolve(__dirname, 'src/js/main.js'),
    mainTwo: path.resolve(__dirname, 'src/js/mainTwo.js'),
  }
}

// 多入口打包的模板
const HtmlWeb = () => {
  const names = Object.keys(multiEntry())
  const htmlList = []
  names.forEach(key => {
    htmlList.push(
      new HtmlWebpackPlugin({
        template: `./src/${key}.html`, //只增加了这行
        filename: `${key}.html`,
      })
    )
  })
  return htmlList
}

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: 'https://itecnote.com/', //指定资源公共地址，本地环境运行时也会加上
  },
  devtool: false,
  plugins: [new CleanWebpackPlugin(), ...HtmlWeb()],
})

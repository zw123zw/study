const path = require('path') //node的path模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //css样式抽离
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩css
const webpack = require('webpack')
const HappyPack = require('happypack') //多进程打包
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') //打包过程的loader与plugin时间
const smp = new SpeedMeasurePlugin()

// 多入口打包
const multiEntry = () => {
  return {
    main: path.resolve(__dirname, 'src/js/main.js'),
    mainTwo: path.resolve(__dirname, 'src/js/mainTwo.js'),
  }
}

module.exports = smp.wrap({
  entry: multiEntry,
  optimization: {
    splitChunks: {
      //chunk公共模块提取
      chunks: 'all',
    },
    minimizer: [
      // 用于压缩css文件
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {
            disable: true,
          },
          mergeLonghand: false,
          discardComments: {
            removeAll: true, // 移除注释
          },
        },
        canPrint: true,
      }),
    ],
  },
  externals: {
    './utils.js': `commonjs2 ./utils.js`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.json', '.css', '.html'],
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader', //postcss-loader css预处理库，增加浏览器前缀，执行顺序必须保证在 css-loader 之前
          'sass-loader', //sass文件的处理
        ],
      },
      {
        test: /\.js$/,
        use: 'happypack/loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'css/[name].[chunkhash:8].css', //同步加载的css资源名
      chunkFilename: '[id].css', //异步加载的css资源名
    }),
    new webpack.DefinePlugin({
      //生产和测试环境添加不同的环境变量
      AUTHOR: "'ZE'",
      AGE: 12,
      SEX: false,
    }),
    new HappyPack({
      // 3) re-add the loaders you replaced above in #1:
      loaders: ['babel-loader?presets[]=es2015'],
    }),
  ],
})

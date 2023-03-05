const path = require("path"); //node的path模块
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css样式抽离
const HtmlWebpackPlugin = require("html-webpack-plugin"); //可以生成创建html入口文件
// 引入clean-webpack-plugin插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  // 开启监听自动打包
  // watchOptions: {
  // 	// 设置不监听的文件或文件夹，默认为空
  // 	ignored: /node_modules/,
  // 	// 文件改变不会立即执行，而是会等待300ms之后再去执行
  // 	aggregateTimeout: 300,
  // 	// 原理是轮询系统文件有无变化再去更新的，默认1秒钟轮询1000次
  // 	poll: 1000
  // },
  devServer: {
    port: 8081,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["./src/css/theme.scss", "./src/css/mixin.scss"],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            //当加载的图片小于limit时，会直接用url-loader将图片的格式编译成base64格式的
            //当加载图片大于limit时，需要使用file-loader来编译，并且打包到dist文件夹下面
            options: {
              limit: 16000,
              name: "images/[name].[hash:8].[ext]", // 对打包后的图片命名进行相关的处理，表示在dist文件夹下建一个img文件夹保存图片，同时图片的名字是原来的名字加上8位hash值，
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 清除dist文件夹
    new CleanWebpackPlugin(),
    // 解析
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: "[name].css", //同步加载的css资源名
      chunkFilename: "[id].css", //异步加载的css资源名
    }),
  ],
};

const path = require("path");
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].js",
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.css|\.scss$/i,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
      ,
      { test: /\.ts$/, use: "ts-loader" },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./index.html" }),
  ],
};

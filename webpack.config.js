
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { colors: true },
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      },
      '/media/*': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
     }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }],
      },
      {
        test: /\.(es6|js)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: '/node_modules/',
        use: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader", 'sass-loader'] }),
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader?helperDirs[]=" + __dirname + "/src/helpers",
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url-loader?limit=2048&name=images/[name].[ext]'
　　　　}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      template:  __dirname + "/src/index.html"
    }),
    new ExtractTextPlugin({ filename: "style.css" })
  ]
};

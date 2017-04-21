const webpack = require('webpack');
const serverConfig = require('./server/config/config.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', `${__dirname}/client/router`],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: `${__dirname}/client/index.html`,
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('[name].css')
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          protocol: 'http',
          port: serverConfig.port
        },
        secure: false
      }
    }
  }
};

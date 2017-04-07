const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: `${__dirname}/client/index.html`,
  filename: 'index.html',
  inject: 'body'
});

const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: `${__dirname}/client/router`,
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
          limit: 25000
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`
  },
  plugins: [
    HTMLWebpackPluginConfig,
    HotModuleReplacementPlugin
  ],
  devServer: {
    historyApiFallback: true
  }
};

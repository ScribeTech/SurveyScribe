const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: `${__dirname}/client/index.html`,
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: `${__dirname}/client/index.jsx`,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`
  },
  plugins: [HTMLWebpackPluginConfig]
};

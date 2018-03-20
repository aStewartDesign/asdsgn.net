const path = require('path');

const config = {
  target: 'node',
  entry: {
      handler: './handler.js'
  },
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.hbs/, use: 'html-loader' }
    ]
  },
  devtool: 'eval-source-map'
};

module.exports = config;
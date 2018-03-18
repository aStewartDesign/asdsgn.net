const path = require('path');

const config = {
  target: 'web',
  entry: {
      client: './client.js'
  },
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  devtool: 'eval-source-map'
};

module.exports = config;
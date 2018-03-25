const path = require('path');

const config = {
  target: 'node',
  entry: {
      posts: './posts.js'
  },
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  externals: [
    'aws-sdk'
  ],
  devtool: 'eval-source-map'
};

module.exports = config;
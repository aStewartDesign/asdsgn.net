const path = require('path');
const slsw = require('serverless-webpack');

const config = {
  target: 'node',
  entry: slsw.lib.entries,
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: [
    'aws-sdk'
  ],
  devtool: 'eval-source-map'
};

module.exports = config;
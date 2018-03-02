const path = require('path');

const config = {
  target: 'node',
  entry: {
      renderLambda: './app/src/renderLambda.js',
      client: './app/src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/dest'),
    filename: '[name].js',
    library: 'renderLambda',
    libraryExport: 'default',
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
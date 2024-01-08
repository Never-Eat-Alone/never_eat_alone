const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
module.paths.push(path.resolve(process.cwd(), 'node_modules'));
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  devtool: isProduction ? false : 'source-map',
  entry: path.resolve(process.cwd(), 'source/app.ts'),
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  output: {
    path: path.resolve(process.cwd(), 'application'),
    filename: 'server.js'
  },
  performance: {
    hints: false
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
  target: 'node',
  externals: {
    express: 'commonjs express'
  },
  ignoreWarnings: [/Failed to parse source map/]
};

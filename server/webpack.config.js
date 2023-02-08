const path = require('path');
module.paths.push(path.resolve(process.cwd(), 'node_modules'));
const nodeExternals = require('webpack-node-externals');
const PROD = JSON.parse(process.env.PROD_ENV || '0');
module.exports = {
  devtool: PROD ? false : 'source-map',
  entry: path.resolve(process.cwd(), 'source/app.ts'),
  mode: PROD ? 'production' : 'development',
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
  target: 'node',
  externals: [nodeExternals]
};

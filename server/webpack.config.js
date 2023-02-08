const path = require('path');
module.paths.push(path.resolve(process.cwd(), 'node_modules'));
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
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      'fs': false,
      'path': false,
      'zlib': false,
      'querystring': false,
      'util': false,
      'url': false,
      'net': false,
      'tls': false,
      'dns': false,
      'pg-native': false,
      'crypto': false,
      'assert': false,
      'stream': false,
      'http': false,
      'buffer': false
    }
  }
};

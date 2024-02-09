const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
module.paths.push(path.resolve(process.cwd(), 'node_modules'));
const configPath = path.join(__dirname, '/application/config.json');
const config = JSON.parse(fs.readFileSync(configPath).toString());
const isProduction = config.node_env === 'production';
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

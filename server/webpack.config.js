const path = require ('path');
module.paths.push (path.resolve (process.cwd (), 'node_modules'));
const MinifyPlugin = require ('babel-minify-webpack-plugin');
const PROD = JSON.parse (process.env.PROD_ENV || '0');
const minifyOpts = {};
const minigyPluginOpts = {
  test: /\.js($|\?)/i,
};
const nodeExternals = require('webpack-node-externals');
module.exports = {
  devtool: PROD ? 'none' : 'source-map',
  entry: path.resolve (process.cwd (), 'source/app.ts'),
  mode: PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  output: {
    path: path.resolve (process.cwd (), 'application'),
    filename: 'server.js',
  },
  performance: {
    hints: false,
  },
  plugins: PROD ? [new MinifyPlugin (minifyOpts, minigyPluginOpts)] : [],
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.js', '.json'],
  },
  target: 'node',
  externals: [nodeExternals()],
};

const webpack = require('webpack');
const path = require('path');
module.paths.push(path.resolve(process.cwd(), 'node_modules'));
const PROD = JSON.parse(process.env.PROD_ENV || '0');
module.exports = {
  devtool: PROD ? false : 'source-map',
  entry: path.resolve(process.cwd(), 'source/index.tsx'),
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
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_STRIPE_PUBLIC_KEY: JSON.stringify(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY),
      },
    })
  ],
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      react: path.resolve('node_modules/react'),
      'react-dom': path.resolve('node_modules/react-dom'),
      'react-router': path.resolve('node_modules/react-router'),
      'react-router-dom': path.resolve('node_modules/react-router-dom'),
    },
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
};

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const commonPaths = require('./paths');

module.exports = {
  entry: {
    main: './index.tsx',
  },
  output: {
    path: commonPaths.outputPath,
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/',
  },
  context: path.resolve(__dirname, 'src'),
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl)$/,
        use: ['raw-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp|tif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};

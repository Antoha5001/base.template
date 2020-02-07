const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');


console.log(path.resolve(__dirname));
const config = {
  context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry:  './index.js',
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: '3030'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackInlineSVGPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.ttf$/,
        use: [
          'file-loader'
        ]
      },
       {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
      ]
  }
};

module.exports = config;

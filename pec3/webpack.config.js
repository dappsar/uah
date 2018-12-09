const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-core/register");
require("babel-polyfill");

module.exports = {
	entry: ['babel-polyfill', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
		filename: 'app.js',
		sourceMapFilename: "build.map"
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './src/index.html', to: "index.html" }
    ])
  ],
  module: {
    rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.ts$/,
				use: ['ts-loader']
			}			
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
		]
  }
}

const path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {main: path.join(__dirname, 'src/js', 'app.js')},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'main.js'
	},
	/*
	We added a module key to our webpack config object assigning it an object with rules property, 
	which is an array of some rules for configuring the loaders we want to use with webpack
	*/
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: [
				path.resolve(__dirname, "src/")
			]
		}]
	}
}

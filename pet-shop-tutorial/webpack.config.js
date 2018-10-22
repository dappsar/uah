const path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src/js', 'app.js'), 
	output: {
		filename: 'build.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: [
				path.resolve(__dirname, "src/"),
				path.resolve(__dirname, "build/contracts/")
			]
		}]
	}
}
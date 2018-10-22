const path = require('path')
const json1 = require('build/contracts/Adoption.json');
const json2 = require('build/contracts/Migration.json');

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
		}],
		loaders: [
			{
			test: /\.json$/,
			loader: 'json-loader'
			}
		]   
	}
}
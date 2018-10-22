const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'src/js', 'app.js'), 
	output: {
	filename: 'build.js',
	path: path.join(__dirname, 'dist')
},
module: {
   rules: [{
	  test: /\.css$/, // To load the css in react
	  use: ['style-loader', 'css-loader'],
	  include: [
		 /src/,
		 /contracts/,
		 /migrations/,
		 /build/
	  ]
   }]
}
}
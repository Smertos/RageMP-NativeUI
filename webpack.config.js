const { resolve } = require('path');

module.exports = {

	entry: './index',

	output: {
		filename: 'index.js',
		path: resolve('.')
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		extensions: ['.ts']
	}
};

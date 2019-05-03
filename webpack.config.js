const NpmDtsPlugin = require('npm-dts-webpack-plugin');
const { resolve } = require('path');

module.exports = {

	entry: './index',

	output: {
		filename: 'index.js',
		path: resolve('.')
	},

	plugins: [
		new NpmDtsPlugin({ logLevel: 'warn' })
	],

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

const NpmDtsPlugin = require('npm-dts-webpack-plugin');
const { resolve } = require('path');

module.exports = {

	entry: './src/index',

	output: {
		filename: 'index.js',
		path: resolve('lib')
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
		extensions: ['.ts'],
		modules: ['src', 'node_modules']
	}
};

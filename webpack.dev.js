const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPath = path.resolve( __dirname , 'dist');

module.exports = {

	entry: {
		index: './src/index.js'
	},

	devServer: {
		port: 8080
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}	
			}
		]
	},

	plugins:[
		new HTMLWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['index'],
			filename: 'index.html'
		})
	]

}
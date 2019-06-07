const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	devtool: 'source-map',

	entry: {
		index: './src/index.js'
	},

	output: {
		filename: '[name].[hash:20].js',
		path: buildPath
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin(),
		new CleanWebpackPlugin({buildPath}),
		new HTMLWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			chunks: ['index'],
			filename: 'index.html'
		}),
	],

	optimization: {
		minimizer: [
			new UglifyJSWebpackPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
}

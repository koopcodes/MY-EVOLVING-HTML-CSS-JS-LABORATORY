const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: 'public/img/[name].[ext]',
						outputPath: 'dist/img/',
					},
				},
			},

			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							// publicPath: '../',
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true,
					},
				},
			},
			{
				test: /\.(otf|ttf|eot|woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: 'fonts/[name].[ext]',
						outputPath: 'dist/fonts',
					},
				},
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),

		new HtmlWebpackPlugin({
			template: './index.html',
			filename: './index.html',
			hash: true,
		}),

		// new webpack.ProvidePlugin({
		//   $: 'jquery',
		//   jQuery: 'jquery',
		//   'window.jQuery': 'jquery'
		//   }),
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		// historyApiFallback: true,
		publicPath: '/',
		open: true,
		overlay: {
			warnings: false,
			errors: true,
		},
	},

	resolve: {
		alias: {
			jquery: path.resolve(
				__dirname,
				'./node_modules/jquery/dist/jquery.min.js'
			),
		},
	},
};

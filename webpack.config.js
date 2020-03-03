const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mergeConfig = require('webpack-merge');
const envConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = env => {
	const config = mergeConfig(
		{
			entry: ['@babel/polyfill', './src/index.js'],
			output: {
				path: path.resolve(__dirname, 'dist'),
				chunkFilename: '[name].[contenthash].chunk.js',
				filename: '[name].[contenthash].js',
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: ['babel-loader'],
						exclude: /node_modules/,
					},
					{
						test: /\.css$/,
						use: ['style-loader', 'css-loader'],
					},
					{
						test: /\.scss$/,
						use: [
							{
								loader: 'style-loader',
							},
							{
								loader: 'css-loader',
							},
							{
								loader: 'sass-loader',
								options: {
									data: '@import "variables";',
									includePaths: [
										path.resolve(
											__dirname,
											'./src/styles/',
										),
									],
								},
							},
						],
					},
					{
						test: /\.(jpg|png|gif|svg|pdf|ico|ttf|woff|woff2|eot)$/,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: '[path][name]-[hash:8].[ext]',
								},
							},
						],
					},
				],
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: './public/index.html',
					filename: 'index.html',
					PUBLIC_URL: process.env.PUBLIC_URL || '',
				}),
			],
			resolve: {
				alias: {
					src: path.resolve(__dirname, './src'),
				},
			},
		},
		envConfig(env),
	);
	return config;
};

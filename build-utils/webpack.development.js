const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
	return {
		devtool: 'source-map',
		plugins: [
			new webpack.ProgressPlugin(),
			new Dotenv({
				path: path.resolve(__dirname, `../src/config/.env.development`),
				silent: false
			})
		],
		devServer: {
			historyApiFallback: true,
			open: true,
			port: 5000,
			overlay: {
				errors: true
			}
		}
	};
};

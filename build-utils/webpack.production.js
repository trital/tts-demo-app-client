const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
	return {
		plugins: [
			new Dotenv({
				path: path.resolve(__dirname, `../src/config/.env.${env}`),
				silent: false
			})
		]
	};
};

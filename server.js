/**Serving app on Heroku */
const exec = require('child_process').exec;

const dir = exec('npm i express', (err, stdout) => {
	if (err) {
		console.log('Error installing serve dependencies.');
	}
	console.log(stdout);
});

dir.on('exit', code => {
	console.log('Exit Code: ', code);
	if (code === 0) {
		const express = require('express');
		const path = require('path');

		const port = process.env.PORT || 8080;
		const app = express();

		app.use(express.static(path.join(__dirname, 'dist')));

		app.get('/', (req, res) => {
			res.sendFile(path.join(__dirname, 'dist', 'index.html'));
		});

		app.listen(port, () => console.log(`Server started at port: ${port}`));
	}
});

const mongoose = require('mongoose'),
	chalk = require('chalk'),
	Promise = require('bluebird');
	mongoose.Promise = Promise;

const connectDatabase = async (database) => {
	try {
		await mongoose.connect(database.url, database.options);
		console.info(chalk.green(`Connecting to mongo on ${database.url}`));
	}
	catch (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
		console.log('error', err);
		await mongoose.disconnect();
	}
};

module.exports = connectDatabase;
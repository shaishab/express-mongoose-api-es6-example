const mongoose= require('mongoose'),
	util        = require('util'),
	config      = require('./config/config'),
	app         = require('./config/express').init(),
	chalk       = require("chalk"),
	connectDatabase = require('./config/db-connect');

const debug = require('debug')('express-mongoose-es6-api-starter:server');

connectDatabase(config.database);

if (process.env.NODE_ENV === 'debug') {
	mongoose.set('debug', (collectionName, method, query, doc) => {
		debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
	});
}

app.listen(config.port, () => {
	console.info(chalk.green(`${config.app.title} server started on port ${config.port}`));
	console.info(chalk.green('Serving requests on url ' + config.app.baseUrl));
});

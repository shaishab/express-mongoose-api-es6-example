'use strict';

/**
 * Module dependencies.
 */
const https = require('https'),
	express = require('express'),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	asset = require('./assets/all'),
	config = require('./config'),
	expressValidation = require('express-validation'),
	helmet = require('helmet'),
	cors = require("cors"),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	APIError = require('../app/helpers/APIError');

const initMiddleware = app => {

	// Showing stack errors
	app.set('showStackError', true);

	// secure apps by setting various HTTP headers
	app.use(helmet());

	// Allow cross origin
	app.use(cors());

	app.use(compression());
	app.use(methodOverride());

	// Passing the request url to environment locals
	app.use((req, res, next) => {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(cookieParser());

	app.use(bodyParser.json({limit: '5mb'}));

};

// Initialize error route
const initErrorRoutes = app => {
	// Assume 'not found' in the error message is a 404.
	app.use((err, req, res, next) => {
		if (err instanceof expressValidation.ValidationError) {
			// validation error contains errors which is an array of error each containing message[]
			const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
			const error = new APIError(unifiedErrorMessage, err.status, true);
			return res.status(err.status).send(error);
		} else if (!(err instanceof APIError)) {
			const apiError = new APIError(err.message, err.status, err.isPublic);
			return res.status(err.status).send(apiError);
		} else {
			return next(err);
		}
	});

	// Assume 404 since no middleware responded
	app.use((err, req, res, next) => {
		if (!err) return next();
		res.status(404).send('Unknown Error');
	});
};

// Globing routes files
const initServerRoutes = app => {
	config.getGlobedFiles(asset.routes).forEach(routePath => {
		require(path.resolve(routePath))(app);
	});
};

/**
 * Initialize the Express application
 */
module.exports.init = () => {
	let app = express();
// Initialize middleware
	initMiddleware(app);

// Initialize routes
	initServerRoutes(app);

// Initialize error routes
	initErrorRoutes(app);

	if (process.env.NODE_ENV === 'production') {
		// Create HTTPS Server
		return https.createServer({
			key: 'privateKey',
			cert: 'certificate'
		}, app);
	}
	return app;
};
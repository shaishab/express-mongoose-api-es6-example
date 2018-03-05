const winston = require('winston'),
	config = require('../../config/config');
  require('winston-loggly');

winston.emitErrs = true;

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			name: 'console-logging',
			level: config.logging.level,
			handleExceptions: true,
			humanReadableUnhandledException: true,
			json: false,
			colorize: true,

			timestamp: function () {
				let d = new Date();//Date.now();
				return d.getFullYear() + ' ' + (d.getMonth() >= 10 ? d.getMonth() : '0' + d.getMonth()) + ' ' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();//d.format('yyyy-MM-dd-HH:mm:ss');
			},

			formatters: function (options) {
				// Return string will be passed to logger.
				return options.timestamp() + ' ' + winston.config.colorize(options.level, options.level.toUpperCase()) + ' ' + (undefined !== options.message ? options.message : '') +
					(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
			}

		}),
		new winston.transports.Loggly({
			inputToken: 'test-project',
			subdomain: 'test',
			tags: ['test-project'],
			json: true,
			handleExceptions: true,
			name: 'loggly-logging',
			level: config.logging.level
		})
	],
	exitOnError: false
});

module.exports = logger;
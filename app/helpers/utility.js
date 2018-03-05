const _ = require("lodash"),
	os = require('os'),
	logger = require('../helpers/logger'),
	config = require('../../config/config');


const getIPAddress = () => {
	return _.chain(os.networkInterfaces())
		.values()
		.flatten()
		.filter(val => {
			return (val.family == 'IPv4' && val.internal == false)
		})
		.map('address')
		.first()
		.value();
};

exports.logMessage = (level, data, logMsg) => {

	let logData = {
		sourceIp: getIPAddress(),
		remoteHost: (data.req.headers ? data.req.headers['x-forwarded-for'] : ''),
		url: data.req.url,
		id: '' + data.id + '',
		action: data.action,
		location: data.location,
		deployment: config.logging.deployment,
		params: data.req.params,
		body: data.req.body,
		status: data.status
	};

	if (data.req && data.req.query) {
		try {
			let query = data.req.query;
			logData.url = data.req.path;
			logData.query = JSON.stringify(query).replace(/\\/g, "");
		} catch (e) {
			logger.log('error', 'Error Parsing query in utility.logMessage', logData);
		}
	}

	logger.log(level, logMsg, logData);
};


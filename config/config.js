'use strict';

const extend = require('lodash/extend'), 
	union = require('lodash/union'),
  isString = require('lodash/isString'),
	isArray = require('lodash/isArray'),
  glob = require('glob');

/**
 * Load app configurations
 */
module.exports = extend(
	require('./env/all'),
	require(`./env/${process.env.NODE_ENV}`) || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobedFiles = (globPatterns, removeRoot) => {
	// URL paths regex
	let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	let output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (isArray(globPatterns)) {
		for (let globPattern of globPatterns) {
			output = union(output, this.getGlobedFiles(globPattern, removeRoot));
		}
	} else if (isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			let files = glob(globPatterns, {sync: true});
			if (removeRoot) {
				files = files.map(file => {
					return file.replace(removeRoot, '');
				});
			}
			output = union(output, files);
		}
	}
	return output;
};


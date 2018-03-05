const flatten = require("lodash/flatten"),
	map = require("lodash/map");

const getCastErrorMessage = item => {
	let value = item.value;
	let path = item.path;
	return {message: 'The id value of ' + value + ' provided for field ' + path + ' is invalid'};
};

module.exports.resolve = err => {
	let errors = [];
	if (err.name === 'ValidationError') {
		errors = flatten(map(err.errors, items => {
			if (items.name === 'CastError') {
				return getCastErrorMessage(items);
			} else {
				return {message: items.message};
			}
		}));
	} else if (err.name === 'CastError') {
		errors.push(getCastErrorMessage(err));
	} else if (err.name === 'MongoError') {
		if (err.code === 11000) {
			errors.push({message: 'Duplicate index error happened.'});
		} else {
			errors.push({message: err.message});
		}
	} else {
		errors.push({message: err.message});
	}
	return errors[0].message;
};

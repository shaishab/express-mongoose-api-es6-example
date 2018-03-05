const Joi = require('joi');

module.exports = {
	create: {
		body: {
			firstName: Joi.string().alphanum().min(4).required(),
			firstName: Joi.string().alphanum().min(1).required(),
			email: Joi.string().email().required()
		}
	}
};
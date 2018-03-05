const userController = require('../controllers/user.server.controller'),
	config = require('../../config/config'),
	validate = require('express-validation'),
	requestValidation = require('../validations/user.server.validation');

module.exports = (app) => {
	let url = config.app.baseUrl;

	app.route(url + 'users/')
		.get(userController.list)
		.post(validate(requestValidation.create), userController.create);
};
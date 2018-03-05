const User = require('../models/user.server.model'),
	errorResolver = require("../helpers/errorResolver");


exports.create = async (reqBody) => {
	try {
		let newUser = new User(reqBody);
		await newUser.save();
		return ({success: true, user: newUser});
	} catch (err) {
		return ({success: false, errorMsg: errorResolver.resolve(err)});
	}
};

exports.list = async (reqQuery) => {
	try {
		let query = {};
		let users = await User.find(query).exec();
		return ({success: true, users: users});
	} catch (err) {
		return ({success: false, errorMsg: errorResolver.resolve(err)});
	}
};
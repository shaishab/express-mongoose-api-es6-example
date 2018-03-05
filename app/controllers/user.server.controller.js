const userService = require("../services/user.server.service"),
constants = require("../helpers/constants"),
utility   = require("../helpers/utility");

exports.list = async(req, res) => {
    let response = await userService.list(req.query);
    if(response.success) {
        utility.logMessage('info',
            {
                id: constants.logging.actions.userList,
                action: constants.logging.actions.userList,
                location: constants.logging.locations.userServerController,
                req: req ,
                status: constants.logging.status.success
            },{data: response});
    } else {
        utility.logMessage('error',
            {
                id: constants.logging.actions.userList,
                action: constants.logging.actions.userList,
                location: constants.logging.locations.userServerController,
                req: req,
                status: constants.logging.status.failed
            }, response.errorMsg);
    }
    return res.status(200).json(response);
};

exports.create = async(req, res) => {
	let response = await userService.create(req.body);
	if(response.success) {
		utility.logMessage('info',
			{
				id: constants.logging.actions.userCreate,
				action: constants.logging.actions.userCreate,
				location: constants.logging.locations.userServerController,
				req: req ,
				status: constants.logging.status.success
			},{data: response});
	} else {
		utility.logMessage('error',
			{
				id: constants.logging.actions.userCreate,
				action: constants.logging.actions.userCreate,
				location: constants.logging.locations.userServerController,
				req: req,
				status: constants.logging.status.failed
			}, response.errorMsg);
	}
	return res.status(200).json(response);
};
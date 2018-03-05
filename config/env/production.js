module.exports = {
    app: {
        title: 'express-mongoose-es6-api-starter',
        baseUrl: '/api/'
    },
    database:{
        url: 'mongodb://localhost/express-es6-dev',
	    options: {
		    reconnectTries: 10,
		    reconnectInterval: 500
	    }
    },
    logging: {
        deployment: 'production',
        level: 'info'
    }
};
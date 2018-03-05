const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
	constructor(message, status, isPublic) {
		super();
		this.name = this.constructor.name;
		this.message = message;
		this.status = status;
		this.isPublic = isPublic;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, this.constructor.name);
		} else {
			this.stack = (new Error(message)).stack;
		}
	}
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
module.exports = class APIError extends ExtendableError {
	/**
	 * Creates an API error.
	 * @param {string} message - Error message.
	 * @param {number} status - HTTP status code of error.
	 * @param {boolean} isPublic - Whether the message should be visible to user or not.
	 */
	constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
		super(message, status, isPublic);
	}
};

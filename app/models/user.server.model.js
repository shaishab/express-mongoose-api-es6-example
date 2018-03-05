const mongoose = require('mongoose');

const validateLocalStrategyProperty = property => {
    return property.length;
};

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    }
});

module.exports = mongoose.model('User', UserSchema);
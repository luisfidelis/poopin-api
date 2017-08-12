var mongoose   = require('mongoose');

var Utilities  = require('../util/util.js');
var userSchema = require('../schema/user.js');

var connection = Utilities.connection;

var User = connection.model('users', userSchema);

User.findByEmail = function(email, cb) {
	return this.model('users').findOne({ email : email }, cb);
};
module.exports = {
	User : User
};

var mongoose   = require('mongoose');
var Utilities  = require('../util/util.js');
var userSchema = require('../schema/user.js');



userSchema.methods.findByEmail = function(cb) {
	return this.model('user').function({ email : this.email }, cb);
};

userSchema.methods.findById = function(cb){
	return this.model('user').function({ _id : this._id}, cb);
}
module.exports = mongoose.model('user', userSchema);

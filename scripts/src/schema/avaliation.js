var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new Schema({
	_id         : {type: Schema.ObjectId},
	userId      : {type: Schema.ObjectId, ref: 'users' },
	toiletId    : {type: Schema.ObjectId, ref: 'toilets'}, 
    stars       : Number,
    observation : String
});
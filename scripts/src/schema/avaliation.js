var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new Schema({
	_id         : {type: Schema.ObjectId},
	userId      : {type: Schema.ObjectId},
	toiletId    : {type: Schema.ObjectId}, 
    stars       : Number,
    observation : String
});
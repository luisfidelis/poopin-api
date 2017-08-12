var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new Schema({
	_id       : {type: Schema.ObjectId},
  	name      : String,
  	nickname  : String,
  	email     : String,
  	birthDate : {type: Date},
  	password  : String
});
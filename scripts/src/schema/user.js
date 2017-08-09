var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new Schema({
	_id       : {type: mongoose.Types.ObjectId},
  	name      : String,
  	nickname  : String,
  	birthDate : {type: Date},
  	password  : String
});
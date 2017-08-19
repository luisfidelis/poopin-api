var mongoose   = require('mongoose'),
	FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate'),
	Schema     = mongoose.Schema;

module.exports = new Schema({
	_id       : {type: Schema.ObjectId},
  	name      : String,
  	nickname  : String,
  	email     : String,
  	birthDate : {type: FormatDate, format: 'DD/MM/YYYY'},
  	password  : String
});
var mongoose   = require('mongoose');

var Utilities    = require('../util/util.js');
var toiletSchema = require('../schema/toilet.js');


var connection = Utilities.connection;
var Toilet     = connection.model('toilets', toiletSchema);  

Toilet.findByUser = function(userId, cb) {
	return this.model('toilets').find({ userId : userId}, cb);
};  

module.exports = {
	Toilet : Toilet
};

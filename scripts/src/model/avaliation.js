var mongoose   = require('mongoose');

var Utilities  = require('../util/util.js');

var avaliationSchema = require('../schema/avaliation.js');

var connection = Utilities.connection;
var Avaliation = connection.model('avaliations', avaliationSchema);  

Avaliation.findByUser = function(userId, cb) {
	return this.model('avaliations').find({ userId : userId}, cb);
};

Avaliation.findByToilet = function(toiletId, cb) {
	return this.model('avaliations').find({ toiletId : toiletId}, cb);
};


module.exports = {
	Avaliation : Avaliation
};

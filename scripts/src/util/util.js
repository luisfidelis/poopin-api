var mongoose   = require('mongoose');

var smtpConfig     = require('../../config/smtp.js');
var dbConfig       = require('../../config/db.js');
var geocoderConfig = require('../../config/geocoder.js');

var dbUrl      = dbConfig.url;

var ObjectId   = mongoose.Types.ObjectId;


mongoose.connect(dbUrl);

module.exports = {
	smtpConfig 	   : smtpConfig,
	ObjectId       : ObjectId,
	geocoderConfig : geocoderConfig
};



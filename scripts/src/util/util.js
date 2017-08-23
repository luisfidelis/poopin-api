var mongoose   = require('mongoose');

var smtpConfig     = require('../../config/smtp.js');
var dbConfig       = require('../../config/db.js');
var geocoderConfig = require('../../config/geocoder.js');
var jwt            = require('../../config/jwt.js');

var ObjectId   = mongoose.Types.ObjectId;


//mongoose.connect('mongodb://'+dbConfig.username+':'+dbConfig.password+'@' + dbConfig.host +':'+dbConfig.port+'/' + dbConfig.db, , { useMongoClient: true });

var db = mongoose.createConnection('mongodb://'+dbConfig.username+':'+dbConfig.password+'@' + dbConfig.host +':'+dbConfig.port+'/' + dbConfig.db, { useMongoClient: true });
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

function formattedDate(d = new Date) {
  
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${month}/${day}/${year}`;
}



module.exports = {
	smtpConfig 	   : smtpConfig,
	ObjectId       : ObjectId,
	geocoderConfig : geocoderConfig,
	connection     : db,
  formattedDate  : formattedDate,
  jwt            : jwt
};



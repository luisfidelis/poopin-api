var nodemailer  = require('nodemailer');

var Utilities   = require('../util/util.js');

var transporter = nodemailer.createTransport(Utilities.smtpConfig);

function sendMail(mailOptions){
    // send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
};


module.exports = {
	sendMail : sendMail
};
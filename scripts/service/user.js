'use strict';

var bcrypt 	   = require('bcrypt');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'l3projectsweb@gmail.com',
        pass: 'poopinweed'
    }
});


const saltRounds = 10;

function save(request,reply) {
	const db = request.mongo.db;
	const ObjectID = request.mongo.ObjectID;
	var params        = request.payload;
	var userId        = params.id;
	var userName      = params.name;
	var userNickname  = params.nickname;
	var userBirthDate = params.birthDate;
	

	var userMail      = params.email;
	var userPassword  = params.password; 
	var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	}
	if(userId){
		var _id = new ObjectID(userId);
	    db.collection('users').findOne({_id: new ObjectID(userId) }, function (err, result) {
	        if (err) {
	            response.error = true;
	            response.message = "Falha ao salvar usuário";
	            return reply.response(response);
	        }
	        if(result){
	        	response.message = "Em construção";
	        	return reply.response(response);
	        }
	    });
	}else{
		db.collection('users').findOne({email: userMail}, function (err, result) {
            if (err) {
                response.error = true;
                response.message = "Falha ao salvar usuário";
                return reply.response(response);
            }
            if(result){
            	response.error = true;
        		response.message = "E-mail já cadastrado";
        		return reply.response(response);
            }else{
            	bcrypt.hash(userPassword,saltRounds,function(err, hash){
					if(err){
						response.error = true;
				        response.message = "Falha ao salvar usuário";
				        return reply.response(response);
					}else{
						db.collection('users').insertOne({
					    	name      : userName,
					    	nickname  : userNickname,
					    	birthDate : userBirthDate,
					    	email     : userMail,
					    	password  : hash 
					    }, function(err, result){
					    	if(err){
					    		response.error = true;
					            response.message = "Falha ao salvar usuário";
					            return reply.response(response);
					    	}
					    	db.collection('users').findOne({email: userMail}, function (err, result) {
					            if (err) {
					                response.error = true;
					                response.message = "Falha ao retornar ID do usuário";
					                return reply.response(response);
					            }
					            if(result){
					            	// setup email data with unicode symbols
						           	var message = 'Parabéns por se tornar um novo cagão na plataforma Poopin, '+userName;
						           	if(userNickname){
						           		message +=', ou melhor, '+userNickname;
						           	}
						           	message += '.';
									var mailOptions = {
									    from    : '"L3Projects👻" <l3projectsweb@gmail.com>', // sender address
									    to 		: userMail, // list of receivers
									    subject : 'Novo cagão', // Subject line
									    text    : message, // plain text body
									    html    : '<h1>'+message+'</h1>' // html body
									};

									// send mail with defined transport object
									transporter.sendMail(mailOptions, (error, info) => {
									    if (error) {
									        return console.log(error);
									    }
									    console.log('Message %s sent: %s', info.messageId, info.response);
									});
					            	var user = result;
					            	response.data.push({
					            		"id" : user._id
					            	});
					            	return reply.response(response);
					            }
					   		});
					    });
					}
					
				});
            }
   		});
		
		
	}
};

function login(request, reply){
    const db = request.mongo.db;
    var params = request.payload;
    var userMail      = params.email;
    var userPassword  = params.password; 
    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    }
    db.collection('users').findOne({email: userMail}, function (err, result) {
        if (err) {
            response.error = true;
            response.message = "Falhar ao realizar login";
            return reply.response(response);
        }
        if(result){
        	var user  = result;
        	bcrypt.compare(userPassword, user.password, function(err, result){
        		if(err || !result){
        			response.error = true;
        			response.message = "E-mail ou senha incorretos";
        			return reply.response(response);
        		}else{
        			response.data.push({
        				"id"        : user._id,
        				"email" 	: user.email,
        				"name" 		: user.name,
        				"nickname"  : user.nickname,
        				"birthDate" : user.birthDate
        			});
        			return reply.response(response);
        		}            	
        	});
        }else{
        	response.error = true;
        	response.message = "E-mail ou senha incorretos";
        	return reply.response(response);
        }
    });
};

var exports = module.exports = {
	save  : save,
	login : login
};




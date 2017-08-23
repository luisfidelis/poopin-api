'use strict';

var bcrypt 	     = require('bcrypt');
var SMTPService  = require('./smtp.js');
var User         = require('../model/user.js').User;
var ObjectId     = require('mongoose').Types.ObjectId;
var Utilities    = require('../util/util.js');
var createToken  = require('../util/token.js').createToken;
var mongoose     = require('mongoose')
mongoose.Promise = require('bluebird');

const saltRounds = 10;

function save(userRequest) {

	var userId   = userRequest._id;
	var userMail = userRequest.email;

	var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	}

	if(userId){
		return new Promise(function(resolve,reject){
			User.findOne({_id : new ObjectId(userId)},function(err, user){
				if (err) {
	            	response.error = true;
	            	response.message = "Falha ao salvar usuário";
	            	resolve(response);
	        	}
	        	if(user){
	        		user.name 	   = userRequest.name;
	        		user.nickname  = userRequest.nickname;
	        		user.birthDate = userRequest.birthDate;
	        		User.update(user,function(err, raw){
	        			if(err){
	        				response.error = true;
	            			response.message = "Falha ao atualizar usuário";
	            			resolve(response);
	        			}
	        			response.message = 'Cagão editado com sucesso';
	        			resolve(response);
	        		});	        		
	        	}
			});
				
		});
	}else{
		return new Promise(function(resolve,reject){
			User.findByEmail(userMail, function(err, result){
	            if (err) {
	                response.error = true;
	                response.message = "Falha ao salvar usuário";
	                resolve(response);
	            }
	            if(result){
	            	response.error = true;
	        		response.message = "E-mail já cadastrado";
	        		resolve(response);
	            }else{
	            	bcrypt.hash(userRequest.password,saltRounds,function(err, hash){
						if(err){
							response.error = true;
					        response.message = "Falha ao salvar usuário";
					        resolve(response);
						}else{
							userRequest._id      = new ObjectId();
							userRequest.password = hash;
							let user  = new User(userRequest);
							user.save(function(err, raw){
	        					if(err){
						    		response.error = true;
						            response.message = "Falha ao salvar usuário";
						            resolve(response);
						    	}
						    	if(raw){
					            	// setup email data with unicode symbols
					            	var user = raw;			
						           	var message = 'Parabéns por se tornar um novo cagão na plataforma Poopin, '+user.name;
						           	if(user.nickname){
						           		message +=', ou melhor, '+user.nickname;
						           	}
						           	message += '.';

									var mailOptions = {
									    from    : '"L3Projects👻" <l3projectsweb@gmail.com>', // sender address
									    to 		: user.email, // list of receivers
									    subject : 'Novo cagão', // Subject line
									    text    : message, // plain text body
									    html    : '<h1>'+message+'</h1>' // html body
									};

									SMTPService.sendMail(mailOptions);
	
					            	response.data.push({
					            		"id" : createToken(user._id.toString())
					            	});
					            	resolve(response);
					            }
	        				});
						}
					});
	            }
	   		});
		});
	}
};

function login(options){

    var userMail     = options.email;
    var userPassword = options.password;

    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    }

    return new Promise(function(resolve,reject){
    	User.findByEmail(userMail, function (err, result) {
		   	if (err) {
				response.error = true;
		        response.message = "Falhar ao realizar login";
		        resolve(response);
		    }

		    if(result){
		    	var user  = result;
		    	bcrypt.compare(userPassword, user.password, function(err, result){
		    		if(err || !result){
		    			response.error = true;
		    			response.message = "E-mail ou senha incorretos";
		    			resolve(response);
		    		}else{
		    			response.data.push({
		    				"id"        : user._id,
		    				"email" 	: user.email,
		    				"name" 		: user.name,
		    				"nickname"  : user.nickname,
		    				"birthDate" : user.birthDate instanceof Date ? Utilities.formattedDate(user.birthDate) : null
		    			});
		    			resolve(response);
		    		}            	
		    	});
		    }else{
		    	response.error = true;
        		response.message = "E-mail ou senha incorretos";
        		resolve(response);
        	}
   		});
   	});	
};

var exports = module.exports = {
	save  : save,
	login : login
};




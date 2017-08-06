'use strict';

var bcrypt 	    = require('bcrypt');

var SMTPService = require('./smtp.js');

const saltRounds = 10;

function save(user,mongo) {
	const db 		= mongo.db;
	const ObjectID  = mongo.ObjectID;
	
	var userId   = user._id;
	var userMail = user.email;

	var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	}
	if(userId){
		var _id = new ObjectID(userId);
		return new Promise(function(resolve,reject){
			db.collection('users').findOne({_id: _id }, function (err, result) {
				console.log(result);
	        	if (err) {
	            	response.error = true;
	            	response.message = "Falha ao salvar usuário";
	            	resolve(response);
	        	}
	        	if(result){
	        		result.name 	 = user.name;
	        		result.nickname  = user.nickname;
	        		result.birthDate = user.birthDate;

	        		db.collection('users').updateOne({
	        			_id : _id
	        		},{
	        			'$set' : result
	        		}); 

	        		response.message = 'Cagão editado com sucesso';

	        		resolve(response);
	        		
	        	}
	    	});	
		});
	}else{
		return new Promise(function(resolve,reject){
			db.collection('users').findOne({email: userMail}, function (err, result) {
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
	            	bcrypt.hash(user.password,saltRounds,function(err, hash){
						if(err){
							response.error = true;
					        response.message = "Falha ao salvar usuário";
					        resolve(response);
						}else{
							user._id      = new ObjectID();
							user.password = hash;
							db.collection('users').insertOne(user, function(err, result){
						    	if(err){
						    		response.error = true;
						            response.message = "Falha ao salvar usuário";
						            resolve(response);
						    	}
						    	db.collection('users').findOne({email: userMail}, function (err, result) {
						            if (err) {
						                response.error = true;
						                response.message = "Falha ao retornar ID do usuário";
						                resolve(response);
						            }
						            if(result){
						            	// setup email data with unicode symbols
						            	var user = result;			
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
									
						            	var user = result;
						            	response.data.push({
						            		"id" : user._id
						            	});
						            	resolve(response);
						            }
						   		});
						    });
						}
						
					});
	            }
	   		});
		});
	}
};

function login(options, mongo){
    const db = mongo.db;
    
    var userMail     = options.email;
    var userPassword = options.password;

    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    }

    return new Promise(function(resolve,reject){
    	db.collection('users').findOne({email: userMail}, function (err, result) {
		   	if (err) {
				response.error = true;
		        response.message = "Falhar ao realizar login";
		        console.log(response);
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
		    				"birthDate" : user.birthDate
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




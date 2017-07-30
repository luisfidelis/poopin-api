var bcrypt = require('bcrypt');
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
	    db.collection('users').findOne({_id: new ObjectID(userId) }, function (err, result) {
	        if (err) {
	            response.error = true;
	            response.message = "Falha ao salvar usuário";
	            return reply.response(response);
	        }
	        if(result){
	        	response.message("Em construção");
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
            response.message = "fail";
            return reply.response(response);
        }
        if(result){
        	var user  = result;
        	bcrypt.compare(userPassword, user.password, function(err, result){
        		if(err || !result){
        			response.error = true;
        			response.message = "Incorrect email or password";
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
        	response.message = "Incorrect email or password";
        	return reply.response(response);
        }
    });
};

var exports = module.exports = {
	save  : save,
	login : login
};




'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

const dbOpts = {
    url: 'mongodb://poopin:l3projects@ds127443.mlab.com:27443/poopin',
    settings: {
        poolSize: 10
    },
    decorate: true
};

//



server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }

    server.connection({
  		host: 'https://poopin-api.herokuapp.com' 
	});

    server.route([{
        method: 'POST',
        path: '/user/save',
        handler: function handler(request, reply) {
            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
            var params = request.payload;
            var userId    = params.id;
            var userName  = params.name;
            var userNickname  = params.nickname;
            var userBirthDate = params.birthDate;
            var userMail     = params.email;
            var userPassword  = params.password; 
            var response = {
            	"error" : false,
            	"message": "ok",
            	"data":[]
            }
            if(userId){
	            db.collection('users').findOne({_id: new ObjectID(request.params.id) }, function (err, result) {
	                if (err) {
	                    response.error = true;
	                    response.message = "fail";
	                    return reply.response(response);
	                }
	                if(result){
	                	response.message("Em construção");
	                	return reply.response(response);
	                }
	            });
	        }else{
	        	db.collection('users').insertOne({
	            	name : userName,
	            	nickname : userNickname,
	            	birthDate : userBirthDate,
	            	email : userMail,
	            	password : userPassword 
	            }, function(err, result){
	            	if(err){
	            		response.error = true;
	                    response.message = "fail";
	                    return reply.response(response);
	            	}

	            	db.collection('users').findOne({email: userMail}, function (err, result) {
		                if (err) {
		                    response.error = true;
		                    response.message = "fail";
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
        }
    },{
    	method: 'POST',
        path: '/user/login',
        handler: function handler(request, reply) {
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
                if(result && result.password == userPassword){
                	var user = result;
                    response.data.push({
                		"email" : user.email,
                		"name" :  user.name,
                		"nickname" : user.nickname,
                		"birthDate" : user.birthDate
                	});
                	return reply.response(response);
                }else{
                	response.error = true;
                	response.message = "Incorrect email or password";
                	return reply.response(response);
                }
            });
	          
        }
    }]);

    server.start(function() {
        console.log(`Server started at ${server.info.uri}`);
    });
});

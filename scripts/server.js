'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

const dbOpts = {
    url: 'mongodb://localhost:27017/poopin',
    settings: {
        poolSize: 10
    },
    decorate: true
};




server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }

    server.connection({
 	    port: 3000, 
  		host: 'localhost' 
	});

    server.route( {
        method: 'POST',
        path: '/user/save',
        handler(request, reply) {
            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
            var userId    = request.params.id;
            var userName  = request.params.name;
            var userNickname  = request.params.nickname;
            var userBirthDate = request.params.birthDate;
            var userMail     = request.params.email;
            var userPassword  = request.params.password; 
            if(userId){
	            db.collection('users').findOne({_id: new ObjectID(request.params.id) }, function (err, result) {
	                if (err) {
	                    console.log('error');
	                }
	                if(result){
	                	// update user info
	                }
	            });
	        }else{
	        	db.collection('users').insertOne({
	            	name : userName,
	            	nickname : userNickname,
	            	birthDate : userBirthDate,
	            	email : userMail,
	            	password : userPassword 
	            });
	        }    
        }
    });

    server.start(function() {
        console.log(`Server started at ${server.info.uri}`);
    });
});

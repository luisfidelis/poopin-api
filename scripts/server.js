'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

const dbOpts = {
    url: 'mongodb://127.0.0.1:27017/poopin',
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

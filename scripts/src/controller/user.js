'use strict';

var UserService = require('../service/user.js');

function save(request,reply) {
	var mongo  = request.mongo;
	var params = request.payload;

	var user  = {
		_id       : params.id,
		name      : params.name,
		nickname  : params.nickname,
		birthDate : params.birthDate,
		email     : params.email,
		password  : params.password
	};

	UserService.save(user).then(function(response){
		return reply.response(response);	
	});

};

function login(request, reply){
    var params = request.payload;
    
    var options = {
    	email    : params.email,
    	password : params.password

    };

    UserService.login(options).then(function(response){
    	return reply.response(response);	
    });

};

var exports = module.exports = {
	save  : save,
	login : login
};




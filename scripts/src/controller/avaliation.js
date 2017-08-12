'use strict';

var AvaliationService = require('../service/avaliation.js');

function save(request,reply) {
	var params = request.payload;
	
    var avaliation = {
        userId      : params.userId,
        toiletId    : params.toiletId,
        stars       : params.stars,
        observation : params.observation
    };

    AvaliationService.save(avaliation).then(function(response){
        return reply.response(response);
    });    

};

function getByUser(request, reply){ 
    var params = request.params;
    
    var userId = params.userId;
    
    AvaliationService.getByUser(userId).then(function(response){
        return reply.response(response);                
    });

};

var exports = module.exports = {
	save      : save,
	getByUser : getByUser
};




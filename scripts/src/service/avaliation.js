const async = require('async');
var Avaliation = require('../model/avaliation.js').Avaliation;
var ObjectId   = require('mongoose').Types.ObjectId;

function save(avaliation) {

    var toiletId        = avaliation.toiletId;
	var toiletIdObj     = new ObjectId(toiletId);
    avaliation.toiletId = toiletIdObj;
   
    var userId        = avaliation.userId;
    var userIdObj     = new ObjectId(userId);             
    avaliation.userId = userIdObj;

    var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	};

    return new Promise(function(resolve,reject){
        let avaliation = new Avaliation(avaliation);
        avaliation.save(function(err, result){
        	if(err){
        		response.error   = true;
                response.message = "Falha ao salvar a avaliação da sua cagada";
                resolve(response);
        	}
            response.message = "A avaliação da sua cagada foi salva com sucesso";
        	resolve(response);
        });
    });
};

function getByUser(userId){ 

    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    };

    return new Promise(function(resolve,reject){
        Avaliation.findByUser(new ObjectId(userId),function(err,result){
            if(err){
                response.error   = true;
                response.message = "Erro ao buscar cagadas.";
                resolve(response);
            }else if(result.length == 0){
                response.error   = true;
                response.message = "Nenhuma cagada encontrada.";
                resolve(response);
            }else{
                response.data = result;
                resolve(response);
            }
        });     
    });
 
};

var exports = module.exports = {
	save      : save,
	getByUser : getByUser
};




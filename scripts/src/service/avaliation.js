const async    = require('async');
var Avaliation = require('../model/avaliation.js').Avaliation;
var Toilet     = require('../model/toilet.js').Toilet;
var User       = require('../model/user.js').User;
var ObjectId   = require('mongoose').Types.ObjectId;

function save(avaliation) {

    var toiletId        = avaliation.toiletId;
	var toiletIdObj     = new ObjectId(toiletId);
    avaliation.toiletId = toiletIdObj;
   
    var userId        = avaliation.userId;
    var userIdObj     = new ObjectId(userId);             
    avaliation.userId = userIdObj;

    var _id           = new ObjectId();
    avaliation._id    = _id;

    var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	};

    return new Promise(function(resolve,reject){
        var avaliation = new Avaliation(avaliation);
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
            }
        }).
        populate({
            path: 'toiletId' , 
            select: 'description address city state country lat lng userId'
        }).
        exec(function(err, result){
            if(err){
                response.error   = true;
                response.message = "Erro ao mapear o banheiro das cagadas.";
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




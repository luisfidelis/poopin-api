const async = require('async');

function save(avaliation,mongo) {
	const db       = mongo.db;
	const ObjectID = mongo.ObjectID;

    var toiletId        = avaliation.toiletId;
	var toiletIdObj     = new ObjectID(toiletId);
    avaliation.toiletId = toiletIdObj;
   
    var userId        = avaliation.userId;
    var userIdObj     = new ObjectID(userId);             
    avaliation.userId = userIdObj;

    var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	};

    return new Promise(function(resolve,reject){
        db.collection('avaliation').insertOne(avaliation, function(err, result){
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

function getByUser(userId, mongo){ 
    const db       = mongo.db;
    const ObjectID = mongo.ObjectID;
    
    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    };

    return new Promise(function(resolve,reject){
        db.collection('avaliation').find({userId : new ObjectID(userId)}).toArray(function(err,result){
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




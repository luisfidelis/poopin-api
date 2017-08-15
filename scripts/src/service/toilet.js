const async = require('async');

var Utilities   = require('../util/util.js');

var NodeGeocoder = require('node-geocoder');

var geocoder = NodeGeocoder(Utilities.geocoderConfig);
 
function save(toilet,avaliations,mongo) {
	const db       = mongo.db;
	const ObjectID = mongo.ObjectID;

    var toiletId    = toilet._id;
	var toiletIdObj = toiletId ? new ObjectID(toiletId) : toiletId = new ObjectID();
    toilet._id      = toiletIdObj;
   
    var userId    = toilet.userId;
    var userIdObj = new ObjectID(userId);             
    toilet.userId = userIdObj;

      
    var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	};

    return new Promise(function(resolve,reject){
        var geocoderAddress = toilet.address+', '+toilet.city+', '+toilet.state+', '+toilet.country;
        geocoder.geocode(geocoderAddress, function(err, res) {
            if(err){
                response.error   = true;
                response.message = "Falha ao salvar cagada";
                resolve(response);
            }else{
                var location = res[0];
                var lat = location.latitude;
                var lng = location.longitude;
                toilet.lat = lat;
                toilet.lng = lng;
                db.collection('toilets').insertOne(toilet, function(err, result){
                    if(avaliations && avaliations.length > 0){
                        avaliations.map(function(avaliation){
                            avaliation.userId   = userIdObj;
                            avaliation.toiletId = toiletIdObj; 
                        });
                        db.collection('avaliations').insertMany(avaliations,function(err,result){
                            if(err){
                                response.error   = true;
                                response.message = "Falha ao salvar a avaliação da sua cagada";
                                resolve(response);
                            }
                        });
                    }
                    response.message = "Cagada salva com sucesso";
                    resolve(response);
                });
            }
        });  
        
    });
};

function getAll(mongo){ 
    const db       = mongo.db;
    const ObjectID = mongo.ObjectID;
    
    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    };

    return new Promise(function(resolve,reject){
        db.collection('toilets').find({}).toArray(function(err,result){
            if(err){
                response.error   = true;
                response.message = "Erro ao buscar banheiros.";
                resolve(response);
            }else if(result.length == 0){
                response.error   = true;
                response.message = "Nenhum banheiro encontrado.";
                resolve(response);
            }else{
                async.map(result, function(toilet,callback){
                    db.collection('avaliations').find({toiletId : new ObjectID(toilet._id)}).toArray(function(err,avaliations){
                        toilet.avaliations = avaliations;
                        callback(null,toilet);
                    });
                },function(err,results){
                    if(err){
                        response.error = true;
                        response.message = "Erro ao buscar banheiros";
                        resolve(response);
                    }
                    response.data = results;
                    resolve(response);
                });
            }
        });     
    });
 
};

var exports = module.exports = {
	save   : save,
	getAll : getAll
};




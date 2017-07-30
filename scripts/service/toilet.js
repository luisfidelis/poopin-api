const async = require('async');

function save(request,reply) {
	const db = request.mongo.db;
	const ObjectID = request.mongo.ObjectID;
	
	var params            = request.payload;
	
	var toiletDescription = params.description;
	var toiletAddress     = params.address;
	var toiletCity        = params.city;
	var toiletState       = params.state;
	var toiletCountry     = params.country;
    var toiletLat         = params.lat;
    var toiletLng         = params.lng;
    var toiletUser        = params.userId;
    var toiletAvaliations = params.avalations;
    var _id               = new ObjectID();

    var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	};

    db.collection('toilet').insertOne({
    	    _id         : _id,
    	    description : description,
    		address     : address,
    		city        : city,
    		state       : state,
    		country     : country,
    		lat         : lat,
    		lng         : lng,
    		userId      : userId
        }, function(err, result){
    	if(err){
    		response.error   = true;
            response.message = "Falha ao salvar cagada";
            return reply.response(response);
    	}
    	if(toiletAvaliations && toiletAvaliations.length > 0){
    		toiletAvaliations.map(function(avaliation){
    			avaliation.userId   = toiletUser;
    			avaliation.toiletId = _id; 
    		});
    		db.collection('avaliation').insertMany(toiletAvaliations,function(err,result){
    			if(err){
    				response.error   = true;
    				response.message = "Falha ao salvar a avaliação da sua cagada";
    				return reply.response(response);
    			}
    		});
    	}
    	response.message = "Cagada salva com sucesso";
    	return reply.response(response);
    });
};

function getAll(request, reply){ 
    const db = request.mongo.db;
    const ObjectID = request.mongo.ObjectID;
    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    };

    db.collection('toilet').find({}).toArray(function(err,result){
    	if(err){
    		response.error   = true;
    		response.message = "Erro ao buscar banheiros.";
    		return reply.response(response);
    	}else if(result.length == 0){
    		response.error   = true;
    		response.message = "Nenhum banheiro encontrado.";
    		return reply.response(response);
    	}else{
	    	async.map(result, function(toilet,callback){
   				db.collection('avaliation').find({toiletId : new ObjectID(toilet._id)}).toArray(function(err,avaliations){
   					toilet.avaliations = avaliations;
   					callback(null,toilet);
   				});
    		},function(err,results){
    			if(err){
    				response.error = true;
    				response.message = "Erro ao buscar banheiros";
    				return reply.response(response);
    			}
    			response.data = results;
    			return reply.response(response);
    		});
    	}
    });
 
};

var exports = module.exports = {
	save   : save,
	getAll : getAll
};




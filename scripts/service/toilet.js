function save(request,reply) {
	var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	}
	response.message = "Em construção";
	return reply.response(response);
};

function getAll(request, reply){ 
    const db = request.mongo.db;
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
    		response.data = result;
    		return reply.response(response);
    	}
    });
 
};

var exports = module.exports = {
	save   : save,
	getAll : getAll
};




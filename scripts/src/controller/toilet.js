const ToiletService = require('../service/toilet.js');

const save = (request, reply) => {
	const mongo  = request.mongo;	
	const { description, title, address, city, state, country, lat, lng, userId, id} = request.payload.params;
	
    const toilet = {
        _id: id,
        description,
        title,
        address,
        city,
        state,
        country,
        lat,
        lng,
        userId
    };

    const avaliations = params.avaliations;

    ToiletService.save(toilet, avaliations, mongo).then(response => reply.response(response));    
};

const getAll = (request, reply) => { 
    ToiletService.getAll().then(response => reply.response(response));
};

module.exports = {
	save,
	getAll
};
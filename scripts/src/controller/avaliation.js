const AvaliationService = require('../service/avaliation.js');

const save = (request,reply) => {
	const { userId, toiletId, stars, observation } = request.payload.params;
	
    const avaliation = {
        userId,
        toiletId,
        stars,
        observation
    };

    AvaliationService.save(avaliation).then(response => reply.response(response));    
};

const getByUser = (request, reply) => { 
    const { userId } = request.params;
    
    AvaliationService.getByUser(userId).then(response => reply.response(response));
};

module.exports = {
	save,
	getByUser
};




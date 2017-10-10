const UserService = require('../service/user.js');

const save = (request,reply) => {
	const mongo  = request.mongo;
	const { id, name, nickname, birthDate, email, password } = request.payload.params;

	const user  = {
		_id: id,
		name,
		nickname,
		birthDate,
		email,
		password
	};

	UserService.save(user).then(response => reply.response(response));	
};

const login = (request, reply) => {
    const { email, password } = request.payload.params;
    
    const options = {
    	email,
    	password
    };

    UserService.login(options).then(response => reply.response(response));
};

module.exports = {
	save,
	login
};
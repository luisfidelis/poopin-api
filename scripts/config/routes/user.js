const UserController = require('../../src/controller/user.js');
const group = '/user';

module.exports = [
	{
		path    : `${group}/save`,
		method  : 'POST',
		handler :  UserController.save		
	},{
		path    : `${group}/login`,
		method  : 'POST',
		handler : UserController.login	
	}
];
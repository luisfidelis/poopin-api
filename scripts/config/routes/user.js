var UserController = require('../../src/controller/user.js');

var group = '/user';

module.exports = [
	{
		path    : group+'/save',
		method  : 'POST',
		handler :  UserController.save		
	},{
		path    : group+'/login',
		method  : 'POST',
		handler : UserController.login	
	}
];
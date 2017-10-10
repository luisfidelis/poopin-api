const UserController = require('../../src/controller/user.js');
const group = '/user';

module.exports = [
	{
		path    : `${group}/save`,
		method  : 'POST',
		handler :  UserController.save,		
	  config : {
      auth: false
    }
  },{
		path    : `${group}/login`,
		handler : UserController.save,
		config : {
			auth: false
		}
	},
	{
		path : `${group}/login`,
		method : 'PUT',
		handler : UserController.save
	}
];
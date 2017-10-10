const AvaliationController = require('../../src/controller/avaliation.js');
const group = '/avaliation';

module.exports = [
	{
		path    : `${group}/save`,
		method  : 'POST',
		handler : AvaliationController.save		
	},
	{
		path    : `${group}/user/{userId}`,
		method  : 'GET',
		handler : AvaliationController.getByUser	
	}
];
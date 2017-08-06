var ToiletController = require('../../src/controller/toilet.js');

var group = '/toilet';

module.exports = [
	{
		path    : group+'/getAll',
		method  : 'GET',
		handler : ToiletController.getAll		
	},{
		path    : group+'/save',
		method  : 'POST',
		handler : ToiletController.save	
	}
];
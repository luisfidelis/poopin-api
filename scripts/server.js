'use strict';

module = {};

const Hapi = require('hapi');



const server = new Hapi.Server();

const dbOpts = {
    url: 'mongodb://poopin:l3projects@ds127443.mlab.com:27443/poopin',
    settings: {
        poolSize: 10
    },
    decorate: true
};


// --- Services

var UserService = require("./service/user.js");


server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }

    server.connection({
        port : process.env.PORT ||3000 ,
  		host: '0.0.0.0'
	    //host:'localhost'
    });

    server.route([{
        method: 'POST',
        path: '/user/save',
        handler: UserService.save
    },{
    	method: 'POST',
        path: '/user/login',
        handler: UserService.login
    }]);

    server.start(function() {
        console.log(`Server started at ${server.info.uri}`);
    });
});

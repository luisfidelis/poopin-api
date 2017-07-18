'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  port: 3000, 
  host: 'localhost' 
});

var handlers = {
  saveUser : function saveUser(request, reply){
  		console.log('do something');
  }
};

server.route({
    path: '/user/save',
    method: 'POST',
    handler: handlers.saveUser 
});

server.start(function () {
    console.log('server ready on port 3000');
});
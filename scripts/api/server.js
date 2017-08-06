'use strict';

module = {};

const HOMOLOGATION_ENVIRONMENT = 1;
const PRODUCTION_ENVIRONMENT   = 2;

const connections = require('../config/environment.js');
const dbOpts      = require('../config/db.js');

const Hapi   = require('hapi');
const server = new Hapi.Server();

var envMode  = PRODUCTION_ENVIRONMENT; 

server.connection(connections[envMode]);

server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }

    server.start(function() {
        console.log(`Server started at ${server.info.uri}`);
    });
});

// --- Services

server.register({
    register: require('hapi-router'),
    options: {
        routes: 'scripts/config/routes/*.js' // uses glob to include route files
    }
},function (err) {
    if (err) throw err;
});



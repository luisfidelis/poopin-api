'use strict';

module = {};

const Hapi     = require('hapi');

const HOMOLOGATION_ENVIRONMENT = 1;
const PRODUCTION_ENVIRONMENT   = 2;


const connections = require('../config/environment.js');

const Utilities   = require('../src/util/util.js');

var envMode    = PRODUCTION_ENVIRONMENT; 
var connection = connections[envMode];

var server   = new Hapi.Server();

server.connection(connection);

// --- Services
server.register(require('hapi-auth-jwt'), (err) => {
    if (err) throw err;
    server.auth.strategy('jwt', 'jwt', {
        key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDMyNzI0OTUsImV4cCI6MTUzNDgwODQ5NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.S35wmli5HaClppoB0-2cqe36B-9dMnCkaGHfaVQQNQs',
        verifyOptions: { 
            algorithms: ['HS256'] 
        }
    });
});
server.register({
    register: require('hapi-router'),
    options: {
        routes: 'scripts/config/routes/*.js' // uses glob to include route files
    }
},function (err) {
    if (err) throw err;
    server.start(function() {
        console.log(`Server started at ${server.info.uri}`);
    });
});






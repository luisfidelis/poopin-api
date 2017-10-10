const Hapi = require('hapi');

const HOMOLOGATION_ENVIRONMENT = 1;
const PRODUCTION_ENVIRONMENT   = 2;

const connections = require('../config/environment.js');

const Utilities = require('../src/util/util.js');

const envMode = HOMOLOGATION_ENVIRONMENT;
const connection = connections[envMode];

const server = new Hapi.Server();

server.connection(connection);

// --- Services
server.register(
    {
        register: require('hapi-router'),
        options: {
            routes: 'scripts/config/routes/*.js' // uses glob to include route files
        }
    },
    err => {
        if (err) throw err;
        server.start(() => {
            console.log(`Server started at ${server.info.uri}`);
        }); 
    }
);
// https://hapijs.com/

'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host: '185.44.64.247',
    port: 8000
});

// Add the route
server.route({
    method: 'POST',
    path: '/hello',
    options: {
        cors: true,
        payload: {
            defaultContentType: "application/json"
        }
    },
    handler: function(request, h) {

        console.log(request.payload);

        let clientPayload = request.payload;

        let _serverTimestamp = new Date();
        let serverTimestamp = _serverTimestamp.toISOString();

        clientPayload["serverTimestamp"] = serverTimestamp;
        clientPayload['serverTimeInMS'] = _serverTimestamp.getTime();
        console.log(clientPayload);

        return JSON.stringify(clientPayload);
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
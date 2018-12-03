var mosca = require('mosca');

var ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://185.85.240.64:27017/messageTrunk',
    pubsubCollection: 'pubsub',
    mongo: {
        capped: true
    }
};

var settings = {
    port: 1883
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('RECEIVED: ', packet, packet.payload);

    var x = Buffer.from(packet.payload);

    console.log(Buffer.isBuffer(x), x.toString('utf8'));
    if (Buffer.isBuffer(x) === true) {

        if (packet.topic === "presence") {
            let clientPayload = JSON.parse(x.toString('utf8'));
            let _serverTimestamp = new Date();
            let serverTimestamp = _serverTimestamp.toISOString();

            clientPayload["serverTimestamp"] = serverTimestamp;
            clientPayload['serverTimeInMS'] = _serverTimestamp.getTime();

            let payload = {
                topic: "/presence/world",
                payload: JSON.stringify(clientPayload),
                qos: 0,
                retain: false
            };

            server.publish(payload, response => {
                console.log("done!");
            });

            console.log("SENDING: ", payload);
        }
    }
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
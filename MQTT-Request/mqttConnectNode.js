var mqtt = require('mqtt');
var client = mqtt.connect({ port: 1883, host: "testmachine.fr-1.paas.massivegrid.net", keepalive: 10000 });

client.on('connect', function() {
    client.subscribe('/presence/world', function(err) {
        if (!err) {
            var _date = new Date();
            var date = _date.getTime()
            client.publish('presence', JSON.stringify({
                "message": "Hello MQTT!",
                "clientTimeInMS": date,
                "timestamp": _date.toISOString()
            }), { "qos": 0, "retain": true });
        }
    });
});

client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString());
    let dataFromServer = JSON.parse(message.toString());
    let serverTime = Number(dataFromServer["serverTimeInMS"]);
    let clientTime = Number(dataFromServer["clientTimeInMS"]);
    let diff = serverTime - clientTime;
    console.log("latency is: " + diff + " in ms ");

    client.end();
});
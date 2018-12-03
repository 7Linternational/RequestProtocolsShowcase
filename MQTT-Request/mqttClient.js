function mqttConnect() {

    //var mqtt = require('mqtt');
    var client = mqtt.connect({ port: 3000, host: "testmachine.fr-1.paas.massivegrid.net", "protocolId": "MQTT", keepalive: 10000 });

    client.on('connect', function() {
        client.subscribe('/presence/world', function(err) {
            if (!err) {
                console.log("error: ", err);
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
        jQuery("#request-block-container").append("<div class='block container with-title'><h2 class='title'>MQTT Request</h2> Latency: " + diff + " - Server Timestamp: " + dataFromServer["serverTimestamp"] + " - Client Timestamp: " + dataFromServer["timestamp"] + "</div>");
    });

    function sendMessage() {
        var _date = new Date();
        var date = _date.getTime()
        client.publish('presence', JSON.stringify({
            "message": "Hello MQTT!",
            "clientTimeInMS": date,
            "timestamp": _date.toISOString()
        }), { "qos": 0, "retain": true });
    }

    function disconnect() {
        client.end();
    }

    return {
        sendMessage: sendMessage
    };
};
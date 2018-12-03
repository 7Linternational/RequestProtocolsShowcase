var socketConnect = function() {

    const socket = io('http://testmachine.fr-1.paas.massivegrid.net:8080');
    var that = this;
    var id = "";
    socket.on('connect', () => {
        console.log(socket.id);
        id = socket.id;
    });

    function sendRequest() {
        var _date = new Date();
        var date = _date.getTime()
        var data = JSON.stringify({
            "message": "Hello Socket!",
            "clientTimeInMS": date,
            "timestamp": _date.toISOString()
        });
        socket.emit('hello', data);
    }

    socket.on('response', function(data) {
        console.log(data);
        let dataFromServer = JSON.parse(data);
        let serverTime = Number(dataFromServer["serverTimeInMS"]);
        let clientTime = Number(dataFromServer["clientTimeInMS"]);
        let diff = serverTime - clientTime;
        console.log("latency is: " + diff + " in ms ");
        jQuery("#request-block-container").append("<div class='block container with-title'><h2 class='title'>Socket Request</h2> Latency: " + diff + " - Server Timestamp: " + dataFromServer["serverTimestamp"] + " - Client Timestamp: " + dataFromServer["timestamp"] + "</div>");
    });

    return {
        sendRequest: sendRequest
    };
};
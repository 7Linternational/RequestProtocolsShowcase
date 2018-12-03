var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    /////// receive event ///////////
    socket.on('hello', function(msg) {
        console.log('message: ' + msg);

        let clientPayload = JSON.parse(msg);
        let _serverTimestamp = new Date();
        let serverTimestamp = _serverTimestamp.toISOString();

        clientPayload["serverTimestamp"] = serverTimestamp;
        clientPayload['serverTimeInMS'] = _serverTimestamp.getTime();

        let payload = JSON.stringify(clientPayload);

        socket.emit("response", payload);
    });
});

http.listen(8080, function() {
    console.log('listening on *:8080');
});
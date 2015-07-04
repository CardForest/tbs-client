var express = require('express');
var http = require('http');

var app = express();

app.use(express.static(process.cwd() + '/' + process.env.APP_DIR));


var server = http.createServer(app);
var ioFactory = require('socket.io');
server.listen(process.env.PORT, function() {
  if (process.env.LIVE) {
    var io = ioFactory(this, {"transports": ["websocket"]});
    io.on('connection', function (socket) {
      socket.emit('test', 'hello');
    });

    var request = require('request');
    request('http://localhost:' + process.env.LIVE_PORT + '/__browser_sync__?method=reload', function errorIgnorer() {});
  }
});



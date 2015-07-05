var express = require('express');
var http = require('http');

var app = express();

app.use(express.static(process.cwd() + '/' + process.env.APP_DIR));
var server = http.createServer(app);

require("babel/polyfill");
var BasicAi = require('./lib-compiled/ai/basic').BasicAi;
var Session = require('./lib-compiled/session');
var Cell = require('./lib-compiled/cell');

var ioFactory = require('socket.io');
server.listen(process.env.PORT, function() {
  if (process.env.LIVE) {
    var io = ioFactory(this, {"transports": ["websocket"]});
    io.on('connection', function (socket) {
      var human = {
        init: function (session, mark, next){
          this.session = session;
          this.mark = mark;
          this.next=next;
        },
        makeMove: function (){
          console.log('Human turn to make a move');
        },
        serialize: function () {
          return {mark: this.mark.key};
        }
      };

      var session = new Session(human, new BasicAi(), function (result) {
        if (result !== 'tie') {
          session.stat[session.currentPlayer === human ? 0 : 1]++;
        }
        console.log('Game Ended with ' + result);
      });
      session.stat = [0, 0];
      console.log('sending update!');
      socket.emit('update', {board: session.board.serialize(), result: session.result, currentPlayer: session.currentPlayer.serialize(), stat: session.stat});
      socket.on('init', function () {


        session.init();
        socket.emit('update', {board: session.board.serialize(), result: session.result, currentPlayer: session.currentPlayer.serialize(), stat: session.stat});
      });

      socket.on('markCell', function (msg) {
        session.markCell(msg.x, msg.y);
        socket.emit('update', {board: session.board.serialize(), result: session.result, currentPlayer: session.currentPlayer.serialize(), stat: session.stat});
      });
      socket.on('updateRequest', function (msg) {
        socket.emit('update', {board: session.board.serialize(), result: session.result, currentPlayer: session.currentPlayer.serialize(), stat: session.stat});
      });
    });

    var request = require('request');
    request('http://localhost:' + process.env.LIVE_PORT + '/__browser_sync__?method=reload', function errorIgnorer() {});
  }
});



import Session from './temp/session';
//import BasicAi from './temp/ai/basic';
//import Cell from './temp/cell';

//

class Store {
  constructor() {
    this.rooms = [];
  }

  createRoom(socket) {
    return this.rooms.push({
      ready: {
        X: true,
        O: true
      },
      status: 'waiting for a second player',
      players: [socket],
      serialize() {
        const res = {status: this.status, ready: this.ready};
        if (this.session != null) {
          res.session = {
            board: this.session.board.serialize(),
            result: this.session.result,
            currentPlayer: this.session.currentPlayer.serialize(),
            stat: this.session.stat
          };
        }
        return res;
      }

    }) - 1;
  }

  joinRoom(socket, roomId) {
    if (!this.rooms.hasOwnProperty(roomId)) {
      throw 'room not found';
    }

    const room = this.rooms[roomId];

    if (room.status === 'started' &&
        room.players[0] !== socket &&
        room.players[1] !== socket) {
        throw 'room full';
    }
    if (room.status === 'waiting for a second player' && room.players[0] !== socket) {
      room.players.push(socket);
      room.status = 'started';
      class Human {
        init(session, mark, next){
          this.session = session;
          this.mark = mark;
          this.next=next;
        }
        makeMove(){
          console.log('Human turn to make a move');
        }
        serialize() {
          return {mark: this.mark.key};
        }
      }
      const human0 = new Human();
      room.session = new Session(human0, new Human(), function (result) {
        if (result !== 'tie') {
          room.session.stat[room.session.currentPlayer === human0 ? 0 : 1]++;
        }
        room.ready.X = false;
        room.ready.O = false;
      });
      room.session.stat = [0, 0];

      room.players[0].emit('update', room.serialize());
    }

    return {ownMark: (room.players[0] === socket) ? 'X' : 'O', room: room.serialize()};
  }

  markCell(socket, msg) {
    if (!this.rooms.hasOwnProperty(msg.roomId)) {
      throw 'room not found';
    }
    const room = this.rooms[msg.roomId];

    if (room.status !== 'started') {
      throw 'room.status is not started';
    }

    room.session.markCell(msg.x, msg.y);
    room.players.forEach(function (player) {
      player.emit('update', room.serialize());
    });
  }

  ready(socket, msg) {
    if (!this.rooms.hasOwnProperty(msg.roomId)) {
      throw 'room not found';
    }
    const room = this.rooms[msg.roomId];

    if (socket === room.players[0]) {
      room.ready.X = true;
    }
    if (socket === room.players[1]) {
      room.ready.O = true;
    }

    if (room.ready.X && room.ready.O) {
      room.session.init();
    }

    room.players.forEach(function (player) {
      player.emit('update', room.serialize());
    });
  }

}

export default new Store();

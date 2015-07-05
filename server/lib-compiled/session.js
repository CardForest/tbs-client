'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var Session = (function () {
  function Session(player0, player1, gameEndedCb) {
    _classCallCheck(this, Session);

    player0.init(this, _cell2['default'].X, player1);
    player1.init(this, _cell2['default'].O, player0);
    this.players = [player0, player1];
    this.gameEndedCb = gameEndedCb;
    this.init();
  }

  _createClass(Session, [{
    key: 'init',
    value: function init() {
      delete this.result;
      this.totalMoves = 0;
      this.board = new _board2['default']();
      this.currentPlayer = this.players[Math.floor(Math.random() + 0.5)];
      this.currentPlayer.makeMove();
    }
  }, {
    key: 'isOver',
    value: function isOver() {
      for (var i0 = 0; i0 < 3; i0++) {
        var i1 = (i0 + 1) % 3;
        var i2 = (i0 + 2) % 3;

        var _c0 = this.board[i0][i0];
        if (_c0 !== _cell2['default'].EMPTY) {
          if (_c0 === this.board[i0][i1] && _c0 === this.board[i0][i2]) {
            return 'r' + i0;
          }
          if (_c0 === this.board[i1][i0] && _c0 === this.board[i2][i0]) {
            return 'c' + i0;
          }
        }
      }

      var c0 = this.board[1][1];
      if (c0 !== _cell2['default'].EMPTY) {
        if (c0 === this.board[0][0] && c0 === this.board[2][2]) {
          return 'd0';
        }
        if (c0 === this.board[2][0] && c0 === this.board[0][2]) {
          return 'd1';
        }
      }

      if (this.totalMoves === 9) {
        return 'tie';
      }
    }
  }, {
    key: 'markCell',
    value: function markCell(x, y) {
      console.log('\n' + this.currentPlayer + ' marking ' + x + ' ' + y);
      this.board[x][y] = this.currentPlayer.mark;
      this.totalMoves++;
      this.result = this.isOver();
      console.log(this.toString());
      if (this.result) {
        this.gameEndedCb(this.result);
      } else {
        this.currentPlayer = this.currentPlayer.next;
        this.currentPlayer.makeMove();
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '/---------------\\\n' + (this.result ? 'result = ' + this.result + '\n' : '') + 'board =\n' + this.board + '\n\\---------------/';
    }
  }]);

  return Session;
})();

exports['default'] = Session;
module.exports = exports['default'];

//import {BasicAi} from './ai/basic';
//
//new Session(new BasicAi(), new BasicAi());
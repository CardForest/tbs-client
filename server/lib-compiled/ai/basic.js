'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _strategy = require('./strategy');

function scoreComparator(a, b) {
  for (var priority = 0; priority < 4; priority++) {
    if (b.score[priority] != a.score[priority]) {
      return b.score[priority] - a.score[priority];
    }
  }
  return 0;
}

var BasicAi = (function () {
  function BasicAi() {
    _classCallCheck(this, BasicAi);
  }

  _createClass(BasicAi, [{
    key: 'init',
    value: function init(session, mark, next) {
      this.session = session;
      this.mark = mark;
      this.next = next;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return { mark: this.mark.key };
    }
  }, {
    key: 'makeMove',
    value: function makeMove() {
      var _this = this;

      var moves = this.session.board.getEmptyCells().map(function (cell) {
        var board = _this.session.board.clone();
        board[cell[0]][cell[1]] = _this.mark;
        var score = (0, _strategy.calcScores)(board, _this.mark);
        console.log(_this + ' scored ' + cell + ' as ' + score);
        return {
          cell: cell,
          score: score
        };
      }).sort(scoreComparator);

      var numOfBestMoves = 1;
      var firstMove = moves[0];
      for (var i = 1; i < moves.length; i++) {
        if (0 !== scoreComparator(firstMove, moves[i])) {
          break;
        } else {
          numOfBestMoves++;
        }
      }
      var selectedMove = moves[Math.floor(Math.random() * numOfBestMoves)].cell;

      this.session.markCell.apply(this.session, selectedMove);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'player:' + this.mark.toString();
    }
  }]);

  return BasicAi;
})();

exports.BasicAi = BasicAi;
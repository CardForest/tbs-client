import Board from './board';
import Cell from './cell';

export default class Session {
  constructor(player0, player1, gameEndedCb) {
    player0.init(this, Cell.X, player1);
    player1.init(this, Cell.O, player0);
    this.players = [player0, player1];
    this.gameEndedCb = gameEndedCb;
    this.init();
  }

  init() {
    delete this.result;
    this.totalMoves = 0;
    this.board = new Board();
    this.currentPlayer = this.players[Math.floor(Math.random() + 0.5)];
    this.currentPlayer.makeMove();
  }

  isOver() {
    for (let i0 = 0; i0 < 3; i0++) {
      const i1 = (i0 + 1) % 3;
      const i2 = (i0 + 2) % 3;

      const c0 = this.board[i0][i0];
      if (c0 !== Cell.EMPTY) {
        if (c0 === this.board[i0][i1] && c0 === this.board[i0][i2]) {
          return 'r' + i0;
        }
        if (c0 === this.board[i1][i0] && c0 === this.board[i2][i0]) {
          return 'c' + i0;
        }
      }
    }

    const c0 = this.board[1][1];
    if (c0 !== Cell.EMPTY) {
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

  markCell(x, y) {
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

  toString() {
    return `\
/---------------\\
${this.result ? `result = ${this.result}\n` : ``}\
board =
${this.board}
\\---------------/`;
  }
}

//import {BasicAi} from './ai/basic';
//
//new Session(new BasicAi(), new BasicAi());

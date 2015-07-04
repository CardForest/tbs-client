import {calcScores} from './strategy';

function scoreComparator(a, b) {
  for (let priority = 0; priority < 4; priority++) {
    if (b.score[priority] != a.score[priority]) {
      return b.score[priority] - a.score[priority];
    }
  }
  return 0;
}

export class BasicAi {
  constructor() {
  }

  init(session, mark, next) {
    this.session = session;
    this.mark = mark;
    this.next = next;
  }

  makeMove() {
    const moves = this.session.board.getEmptyCells().map((cell) => {
      const board = this.session.board.clone();
      board[cell[0]][cell[1]] = this.mark;
      const score = calcScores(board, this.mark);
      console.log(`${this} scored ${cell} as ${score}`);
      return {
        cell,
        score
      };
    }).sort(scoreComparator);

    let numOfBestMoves = 1;
    let firstMove = moves[0];
    for (let i = 1; i < moves.length; i++) {
      if (0 !== scoreComparator(firstMove, moves[i])) {
        break;
      } else {
        numOfBestMoves++;
      }
    }
    let selectedMove = moves[Math.floor(Math.random() * numOfBestMoves)].cell;

    this.session.markCell.apply(this.session, selectedMove);
  }

  toString() {
    return `player:${this.mark.toString()}`;
  }
}

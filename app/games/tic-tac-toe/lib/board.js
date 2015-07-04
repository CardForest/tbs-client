import {countTo} from './utils';
import Cell from './cell';

export default class Board extends Array {
  constructor(rows = [for (row of countTo(3)) [for (cell of countTo(3)) Cell.EMPTY]]) {
    super();
    this.push.apply(this, rows);

    Object.freeze(this);
  }

  getEmptyCells() {
    return [for (x of countTo(3)) for (y of countTo(3)) if (this[x][y] === Cell.EMPTY) [x, y]];
  }

  clone() {
    return new Board([for (row of this) [for (cell of row) cell]]);
  }

  toString() {
    return [for (row of this) `\t${row.join(' ')}`].join('\n');
  }
}

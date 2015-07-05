'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Cell = (function () {
  function Cell(key) {
    _classCallCheck(this, Cell);

    this.key = key;
  }

  _createClass(Cell, [{
    key: 'toString',
    value: function toString() {
      return this.key;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this === Cell.EMPTY;
    }
  }]);

  return Cell;
})();

exports['default'] = Cell;

Cell.EMPTY = new Cell('_');
Cell.X = new Cell('X');
Cell.O = new Cell('O');

Cell.X.opposite = Cell.O;
Cell.O.opposite = Cell.X;
module.exports = exports['default'];
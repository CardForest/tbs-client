'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.calcPotentialLines = calcPotentialLines;
exports.calcScores = calcScores;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _cell = require('../cell');

var _cell2 = _interopRequireDefault(_cell);

/**
 * count potentially winning lines
 * @returns [<count of EMPTY lines>, <count of 1 in the same line>, <count of 2 in the same line>,
 *                      <count of 3 in the same line (win)>]
 */

function calcPotentialLines(board) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _potentialLines;

  var markCounts = {
    rows: [(_ref = {}, _defineProperty(_ref, _cell2['default'].EMPTY, 0), _defineProperty(_ref, _cell2['default'].X, 0), _defineProperty(_ref, _cell2['default'].O, 0), _ref), (_ref2 = {}, _defineProperty(_ref2, _cell2['default'].EMPTY, 0), _defineProperty(_ref2, _cell2['default'].X, 0), _defineProperty(_ref2, _cell2['default'].O, 0), _ref2), (_ref3 = {}, _defineProperty(_ref3, _cell2['default'].EMPTY, 0), _defineProperty(_ref3, _cell2['default'].X, 0), _defineProperty(_ref3, _cell2['default'].O, 0), _ref3)],
    cols: [(_ref4 = {}, _defineProperty(_ref4, _cell2['default'].EMPTY, 0), _defineProperty(_ref4, _cell2['default'].X, 0), _defineProperty(_ref4, _cell2['default'].O, 0), _ref4), (_ref5 = {}, _defineProperty(_ref5, _cell2['default'].EMPTY, 0), _defineProperty(_ref5, _cell2['default'].X, 0), _defineProperty(_ref5, _cell2['default'].O, 0), _ref5), (_ref6 = {}, _defineProperty(_ref6, _cell2['default'].EMPTY, 0), _defineProperty(_ref6, _cell2['default'].X, 0), _defineProperty(_ref6, _cell2['default'].O, 0), _ref6)],
    diags: [(_ref7 = {}, _defineProperty(_ref7, _cell2['default'].EMPTY, 0), _defineProperty(_ref7, _cell2['default'].X, 0), _defineProperty(_ref7, _cell2['default'].O, 0), _ref7), (_ref8 = {}, _defineProperty(_ref8, _cell2['default'].EMPTY, 0), _defineProperty(_ref8, _cell2['default'].X, 0), _defineProperty(_ref8, _cell2['default'].O, 0), _ref8)]
  };

  for (var x = 0; x < 3; x++) {
    // group and count the elements in the x row/column
    for (var y = 0; y < 3; y++) {
      markCounts.rows[x][board[x][y]]++;
      markCounts.cols[x][board[y][x]]++;
    }
    // group and count the elements in the diagonals
    markCounts.diags[0][board[x][x]]++;
    markCounts.diags[1][board[2 - x][x]]++;
  }
  var potentialLines = (_potentialLines = {}, _defineProperty(_potentialLines, _cell2['default'].X, [0, 0, 0, 0]), _defineProperty(_potentialLines, _cell2['default'].O, [0, 0, 0, 0]), _potentialLines);

  for (var lineType in markCounts) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = markCounts[lineType][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var markCount = _step.value;

        var xCount = markCount[_cell2['default'].X];
        var oCount = markCount[_cell2['default'].O];
        // this line does not have both X and O meaning it is a potential line
        if (xCount === 0 || oCount === 0) {
          potentialLines[_cell2['default'].X][xCount]++;
          potentialLines[_cell2['default'].O][oCount]++;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return potentialLines;
}

function calcScores(board, mark) {
  var potentialLines = calcPotentialLines(board);

  /**
   * [<own 3 in line (win)>, -<opp 2 in line (opp wins next)>, <own 2 in line (own win if not blocked)>, -<opp 1 in line (interfere>]
   */
  return [potentialLines[mark][3], -potentialLines[mark.opposite][2], potentialLines[mark][2], -potentialLines[mark.opposite][1]];
}
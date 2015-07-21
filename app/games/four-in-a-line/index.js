import angular from 'angular';
import './index.css!';

angular.module('g.four-in-a-line', [])
  .controller('FourInALineController', ['$scope', function($scope) {
    $scope.colVals = [0, 1, 2, 3, 4, 5, 6];
    $scope.rowVals = [0, 1, 2, 3, 4, 5];

    var endGame = function(c1, r1, c2, r2, color) {
      $scope.COL1 = c1;
      $scope.ROW1 = r1;
      $scope.COL2 = c2;
      $scope.ROW2 = r2;
      $scope.C = color === 'b' ? 'rgb(100, 100, 193)' : 'rgb(234, 123, 123)';
      $scope.result = color
    };

    let totalMoves = 0;
    let currentPlayerMark = 'r';
    $scope.session = {
      restart: function() {
        delete $scope.result;
        totalMoves = 0;
        currentPlayerMark = ['r', 'b'][Math.floor(Math.random() + 0.5)];
        this.board = [
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_']
        ];
      },
      board: [
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_']
      ],
      markCol: function (c) {
        for(var r = 5; r >= 0; r--) {
          if (this.board[r][c] === '_') {
            this.board[r][c] = currentPlayerMark;
            currentPlayerMark = currentPlayerMark === 'r' ? 'b' : 'r';
            totalMoves++;
            this.findFour(r, c);
            if (totalMoves === 42) {
              $scope.result = 'tie';
              console.log('tie');
            }
            break;
          }
        }
      },
      findFour: function (r, c) {
        let count = 1, color = this.board[r][c];

        var cLeft, cRight, rBottom, rTop;
        // horizontal
        for (cLeft = c - 1; cLeft >= 0 && color === this.board[r][cLeft]; cLeft--, count++);
        for (cRight = c + 1; cRight < 7 && color === this.board[r][cRight]; cRight++, count++);

        if (count >= 4) {
          endGame(cLeft + 1, r, cRight - 1, r, color);
        } else {
          count = 1;
          // vertical
          for (rBottom = r + 1; rBottom < 6 && color === this.board[rBottom][c]; rBottom++, count++);
          if (count >= 4) {
            endGame(c, r, c, rBottom - 1, color);
          } else {
            count = 1;

            // diagonal left-top
            for (rBottom = r + 1, cLeft = c - 1; rBottom < 6 && cLeft >= 0 && color === this.board[rBottom][cLeft]; rBottom++, cLeft--, count++);
            for (rTop = r - 1, cRight = c + 1; rTop >= 0 && cRight < 7 && color === this.board[rTop][cRight]; rTop--, cRight++, count++);

            if (count >= 4) {
              endGame(cLeft + 1, rBottom - 1, cRight - 1, rTop + 1, color);
            } else {
              count = 1;

              // diagonal left-bottom
              for (rTop = r - 1, cLeft = c - 1; rTop >= 0 && cLeft >= 0 && color === this.board[rTop][cLeft]; rTop--, cLeft--, count++);
              for (rBottom = r + 1, cRight = c + 1; rBottom < 6 && cRight < 7 && color === this.board[rBottom][cRight]; rBottom++, cRight++, count++);

              if (count >= 4) {
                endGame(cLeft + 1, rTop + 1, cRight - 1, rBottom - 1, color);
              }
            }

          }
        }
      }
    };

    $scope.markToFill = {
      '_': 'games/four-in-a-line/circle-fill.svg',
      'r': 'games/four-in-a-line/circle-fill-red.svg',
      'b': 'games/four-in-a-line/circle-fill-blue.svg'
    }
  }]);

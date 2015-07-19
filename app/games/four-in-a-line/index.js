import angular from 'angular';
import './index.css!';

angular.module('g.four-in-a-line', [])
  .controller('FourInALineController', ['$scope', function($scope) {
    $scope.colVals = [0, 1, 2, 3, 4, 5, 6];
    $scope.COL1 = 6
    $scope.ROW1 = 5
    $scope.COL2 = 1
    $scope.ROW2 = 0
    $scope.S = 'false'
    $scope.rowVals = [0, 1, 2, 3, 4, 5];
    $scope.C = 'rgba(100, 100, 193, 0.5)'
    $scope.Cvals = ['rgba(100, 100, 193, 0.5)', 'rgba(234, 123, 123, 0.5)'];

    let currentPlayerMark = 'r';
    $scope.session = {
      board: [
        ['_','b','_','_','_','_','_'],
        ['_','_','b','_','_','_','_'],
        ['_','_','_','b','_','_','_'],
        ['_','_','_','_','b','_','_'],
        ['_','_','_','_','_','b','_'],
        ['_','_','_','_','_','_','b']
      ],
      markCol: function (c) {
        for(let r = 5; r >= 0; r--) {
          if (this.board[r][c] === '_') {
            this.board[r][c] = currentPlayerMark;
            currentPlayerMark = currentPlayerMark === 'r' ? 'b' : 'r';
            break;
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

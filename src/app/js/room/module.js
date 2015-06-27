import angular from 'angular';

import {BasicAi} from 'tic-tac-toe/lib/ai/basic';
import Session from 'tic-tac-toe/lib/session';
import Cell from 'tic-tac-toe/lib/cell';

angular.module('room', [])
//.config(function($mdIconProvider) {
//  $mdIconProvider
//    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
//    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
//    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
//    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
//})
.controller('RoomCtrl', function () {
  class Player {
    constructor() {
    }

    init(session, mark, next) {
      this.session = session;
      this.mark = mark;
      this.next = next;
    }

    makeMove() {
      console.log('yeah I\'m here!');

      //this.session.markCell.apply(this.session, this.session.board.getEmptyCells()[0]);
    }
  }
  this.session = new Session(new Player(), new BasicAi(), function(result) {
    console.log('yeah ' + result);
  });

  this.replay = function() {
    this.session.init();
  };

  this.members = [
    { name: 'Janet Perkins', img: 'img/100-0.jpeg', color: 'rgb(100, 100, 193)', icon: 'img/icons/ic_close_black_24px.svg', player: {
      idx: 0
    }},
    { name: 'Mary Johnson', img: 'img/100-1.jpeg', color: 'rgb(234, 123, 123)', icon: 'img/icons/ic_panorama_fish_eye_black_24px.svg', player: {
      idx: 1
    }}
  ];
  //this.members[0].player.next = this.members[1].player;
  //this.members[1].player.next = this.members[0].player;
  //
  //this.game = {
  //  currentPlayer: this.members[0].player,
  //  board: [
  //    [-1, -1, -1],
  //    [-1, -1, -1],
  //    [-1, -1, -1]
  //  ]
  //};
  //
  //this.game.cellToIcon = (x, y) => {
  //  const cellValue = this.game.board[x][y];
  //  if (cellValue !== -1) {
  //    return this.members[cellValue].icon;
  //  }
  //};
  //
  //this.game.cellToColor = (x, y) => {
  //  const cellValue = this.game.board[x][y];
  //  if (cellValue !== -1) {
  //    return this.members[cellValue].color;
  //  }
  //};
  //
  //this.doPrimaryMemberAction = function(m, event) {
  //  console.log(event);
  //};
  //
  //this.game.cellDisabled = (x, y) => {
  //  return this.game.board[x][y] !== -1;
  //};
  //
  //function rowMatch(row) {
  //  let r1 = row[0];
  //  if (r1 !== -1 && r1 === row[1] && r1 === row[2]) {
  //   return true;
  //  }
  //}
  //
  //  function colMatch(board, c) {
  //    let c1 = board[0][c];
  //    if (c1 !== -1 && c1 === board[1][c] && c1 === board[2][c]) {
  //      return true;
  //    }
  //  }
  //
  //this.game.won = function(x, y) {
  //  const board = this.board;
  //  for (let r = 0; r < 3; r++) {
  //    if (rowMatch(board[r])) {
  //      return {
  //        line: 'r' + r,
  //        dir: (y === 0) ? 'left' : 'right'
  //      };
  //    }
  //  }
  //
  //  for (let c = 0; c < 3; c++) {
  //    if (colMatch(board, c)) {
  //      return {
  //        line: 'c' + c,
  //        dir: (x === 2) ? 'down' : 'up'
  //      };
  //    }
  //  }
  //
  //  let d1 = board[1][1];
  //  if (d1 !== -1) {
  //    if (d1 === board[0][0] &&  d1 === board[2][2]) {
  //      return {
  //        line: 'd' + 0,
  //        dir: (x === 2) ? 'down' : 'up'
  //      };
  //    }
  //    if (d1 === board[2][0] &&  d1 === board[0][2]) {
  //      return {
  //        line: 'd' + 1,
  //        dir: (x === 2) ? 'down' : 'up'
  //      };
  //    }
  //  }
  //};
  //
  //  let moveCount = 0;
  //
  //this.game.toggleCell = (x, y) => {
  //  this.game.board[x][y] = this.game.currentPlayer.idx;
  //
  //
  //  let wonResult = this.game.won(x, y);
  //  if (wonResult) {
  //    this.game.result = wonResult;
  //    this.game.result.color = this.members[this.game.currentPlayer.idx].color;
  //    return;
  //  } else if (++moveCount === 9) {
  //    this.game.result = 'tie';
  //    this.game.result.color = this.members[this.game.currentPlayer.idx].color;
  //    return;
  //  }
  //
  //  this.game.currentPlayer = this.game.currentPlayer.next;
  //};
  //
  //this.game.replay = () => {
  //    moveCount = 0
  //    delete this.game.result
  //    this.game.currentPlayer = this.members[0].player;
  //    this.game.board = [
  //      [-1, -1, -1],
  //      [-1, -1, -1],
  //      [-1, -1, -1]
  //    ];
  //};


})
.directive('cell', function() {
  return {
    scope: true,
    templateUrl: 'views/cell.html',
    link: function(scope, iElement, iAttrs) {
      let markColors = {
        [Cell.EMPTY]: null,
        [Cell.X]: 'rgb(100, 100, 193)',
        [Cell.O]: 'rgb(234, 123, 123)'
      };
      let markIcons = {
        [Cell.EMPTY]: null,
        [Cell.X]: 'img/icons/ic_close_black_24px.svg',
        [Cell.O]: 'img/icons/ic_panorama_fish_eye_black_24px.svg'
      };
      scope.x = iAttrs.x;
      scope.y = iAttrs.y;
      scope.$watch(`room.session.board[${iAttrs.x}][${iAttrs.y}]`, function(newValue) {
        scope.mark = newValue;
        scope.markColor = markColors[newValue];
        scope.markIcon = markIcons[newValue];
      });
    }
  };
});
//.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
//  $scope.toggleLeft = buildToggler('left');
//  $scope.toggleRight = buildToggler('right');
//
//  /**
//   * Build handler to open/close a SideNav; when animation finishes
//   * report completion in console
//   */
//  function buildToggler(navID) {
//    var debounceFn =  $mdUtil.debounce(function(){
//      $mdSidenav(navID)
//        .toggle()
//        .then(function () {
//          $log.debug("toggle " + navID + " is done");
//        });
//    },300);
//
//    return debounceFn;
//  }
//
//})
//.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
//  $scope.close = function () {
//    $mdSidenav('left').close()
//      .then(function () {
//        $log.debug("close LEFT is done");
//      });
//
//  };
//});

export default 'room';

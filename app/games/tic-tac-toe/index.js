import './index.css!';
import angular from 'angular';

import {BasicAi} from './lib/ai/basic';
import Session from './lib/session';
import Cell from './lib/cell';

let markColors = {
    [Cell.EMPTY]: null,
    [Cell.X]: 'rgb(100, 100, 193)',
    [Cell.O]: 'rgb(234, 123, 123)'
};
let markIcons = {
    [Cell.EMPTY]: null,
    [Cell.X]: 'games/tic-tac-toe/X.svg',
    [Cell.O]: 'games/tic-tac-toe/O.svg'
};

angular.module('g.tic-tac-toe', ['tbs.realtime'])
    .factory('g.tic-tac-toe.gameFactory', function (rt) {
      return function (scope) {
        const game = {
          markCell(x, y) {
            return rt.emit('markCell', {x, y});
          },
          init() {
            return rt.emit('init');
          }
        };
        rt.connect(scope)
          .on('update', (msg) => {
            game.board = msg.board;
            game.result = msg.result;
            game.currentPlayer = msg.currentPlayer;
          });

        game.init();

        return game;
      };
    })
    .factory('g.tic-tac-toe.session', function () {
        const human = {
            init(session, mark, next){
                this.session = session;
                this.mark = mark;
                this.next=next;
            },
            makeMove(){
                console.log('Human turn to make a move');
            }
        };

        let session = new Session(human, new BasicAi(), function (result) {
            if (result !== 'tie') {
              session.stat[session.currentPlayer === human ? 0 : 1]++;
            }
            console.log('Game Ended with ' + result);
        });
        session.stat = [0, 0];
        session.XColor = markColors[Cell.X];
        session.OColor = markColors[Cell.O];
        session.templateUrl = 'games/tic-tac-toe/board.html';

        return session
    })
    .directive('fadeStatChange', function($animate) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, iElement, iAttrs) {
                iElement.addClass('stat');
                const idx = iAttrs.fadeStatChange;
                scope.$watchCollection('session.stat', function (stat) {
                    if (stat[idx] !== 0 && stat[idx] !== scope.playerStat) {
                        $animate.addClass(iElement, 'fade').then(function() {
                            scope.playerStat = stat[idx];
                            $animate.removeClass(iElement, 'fade');
                        });
                    } else {
                        scope.playerStat = stat[idx];
                    }
                });
            }
        };
    })
    .directive('cell', function() {
        return {
            scope: true,
            templateUrl: 'games/tic-tac-toe/cell.html',
            link: function(scope, iElement, iAttrs) {

                const x = scope.x = iAttrs.x;
                const y = scope.y = iAttrs.y;
                if (x === '1' || y === '1') {
                    scope.borderStyle = {
                        'border-style': 'solid'
                    };
                    if (x !== '1') {
                        scope.borderStyle['border-width'] = '0 1px';
                    } else if (y !== '1') {
                        scope.borderStyle['border-width'] = '1px 0';
                    } else {
                        scope.borderStyle['border-width'] = '1px';
                    }
                }

                scope.$watch(`session.board[${iAttrs.x}][${iAttrs.y}]`, function(newValue) {
                    scope.mark = newValue;
                    scope.markColor = markColors[newValue];
                    scope.markIcon = markIcons[newValue];
                });
            }
        };
    });

export default 'g.tic-tac-toe';

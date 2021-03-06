import 'angular-material/angular-material.css!';
import './stylesheets/index.css!';
import angular from 'angular';

// modules
import 'angular-material';
import 'angular-route';
import './components/lobby/index';
import './components/room/index';
import './components/realtime/index';

import './games/tic-tac-toe/index';
import './games/four-in-a-line/index';


import throttle from 'lodash.throttle';

angular.module('tbs', ['ngMaterial', 'ngRoute', 'tbs.lobby', 'tbs.room', 'tbs.realtime', 'g.tic-tac-toe', 'g.four-in-a-line'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/lobby/index.html',
        controllerAs: 'lobby',
        controller: 'LobbyController'
      })
      .when('/room/:roomId', {
        templateUrl: 'components/room/index.html',
        controller: 'RoomController',
        //controllerAs: 'room',
        resolve: {
          game: 'g.tic-tac-toe.game'
          //session: 'g.tic-tac-toe.session',
          //gameFactory: 'g.tic-tac-toe.gameFactory',
          //newRoom: function(rt, $route) {
          //  return {status: 'waiting for a second player'};//rt.emit('joinRoom', $route.current.params.roomId);
          //}
        }
      })
      .when('/fourInALine', {
        templateUrl: 'games/four-in-a-line/index.html',
        controller: 'FourInALineController',
        controllerAs: 'room'
      });
}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['tbs'], {strictDi: true});
});

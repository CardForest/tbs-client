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


import throttle from 'lodash.throttle';

angular.module('tbs', ['ngMaterial', 'ngRoute', 'tbs.lobby', 'tbs.room', 'tbs.realtime', 'g.tic-tac-toe'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/lobby/index.html',
        controllerAs: 'lobby',
        controller: 'LobbyController'
      })
      .when('/room/:roomId', {
        templateUrl: 'components/room/index.html',
        controller: 'RoomController',
        controllerAs: 'room',
        resolve: {
          session: 'g.tic-tac-toe.session'
        }
      });
});

angular.element(document).ready(function () {
    angular.bootstrap(document, ['tbs']);
});

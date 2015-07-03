import 'angular-material/angular-material.css!';
//import './stylesheets/index.css!';
import angular from 'angular';

// modules
import 'angular-material';
import 'angular-route';
import './components/lobby/index';
import './components/room/index';
import './components/realtime/index';


import throttle from 'lodash.throttle';

angular.module('tbs', ['ngMaterial', 'ngRoute', 'tbs.lobby', 'tbs.room', 'tbs.realtime'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/lobby/index.html',
        controllerAs: 'lobby',
        controller: 'LobbyController'
      })
      .when('/room/:roomId', {
        templateUrl: 'components/room/index.html',
        controllerAs: 'room',
        controller: 'RoomController'
      });
})
.run(function ($rootScope, $mdToast) {
  $rootScope.$on('error', throttle(function (event, msg) {
    $mdToast.show($mdToast.simple().content(msg).hideDelay(5000));
  }, 30000));
});

angular.element(document).ready(function () {
    angular.bootstrap(document, ['tbs']);
});

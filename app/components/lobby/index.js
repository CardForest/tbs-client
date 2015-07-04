import angular from 'angular';

angular.module('tbs.lobby', [])
.controller('LobbyController', function($scope, rt) {
  rt.connect($scope);
});

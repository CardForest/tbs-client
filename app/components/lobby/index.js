import angular from 'angular';

angular.module('tbs.lobby', [])
.controller('LobbyController', function($scope, rt) {
  rt.connect($scope);

    rt.emit('welcome', {test: 1}).then(function (x) {console.log(x)}, function (x) {console.error(x)});
});

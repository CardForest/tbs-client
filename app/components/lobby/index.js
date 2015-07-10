import angular from 'angular';

angular.module('tbs.lobby', [])
.controller('LobbyController', function($scope, $location, $mdDialog, $document, rt) {
  rt.connect($scope);

  this.createRoom = function () {
    rt.emit('createRoom').then(function (roomId) {
      $location.path(`room/${roomId}`);
    });
  };
});

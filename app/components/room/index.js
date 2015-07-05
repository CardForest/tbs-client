import angular from 'angular';

angular.module('tbs.room', [])
  .controller('RoomController', function ($routeParams, $scope, session, gameFactory, $log) {
    this.id = $routeParams.roomId;
    $log.error(session);
  //  $scope.session = session;
    $scope.session = gameFactory($scope);
  });

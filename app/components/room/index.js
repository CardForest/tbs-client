import angular from 'angular';

angular.module('tbs.room', [])
  .controller('RoomController', function ($routeParams, $scope, session, gameFactory) {
    this.id = $routeParams.roomId;
    $scope.session = session;
    this.status = 'no hope';

    $scope.game = gameFactory($scope);
  });

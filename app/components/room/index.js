import angular from 'angular';

angular.module('tbs.room', ['tbs.realtime'])
  .controller('RoomController', function ($routeParams, $scope, rt, session) {
    this.id = $routeParams.roomId;
    $scope.session = session;
    this.status = 'no hope';
    rt.connect($scope)
      .on('test', (msg) => {
        this.status = 'yes! got ' + msg;
      });
  });

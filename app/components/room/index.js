import angular from 'angular';

angular.module('tbs.room', ['tbs.realtime'])
.controller('RoomController', function($routeParams, rtClient) {
  this.id = $routeParams.roomId;

  this.connect = rtClient.connect;
});

import angular from 'angular';

angular.module('tbs.room', [])
  .controller('RoomController', function (/*, session, gameFactory, */game, $log, $routeParams, rt, $scope) {
    $scope.game = game;

    rt
    .connect($scope)
    .on('update', function (room) {
      $scope.room = room;
      if (room.session != null) {
        $scope.session = room.session;
        $scope.session.markCell = function(x, y) {
          return rt.emit('markCell', {roomId: $routeParams.roomId, x, y});
        };
        $scope.session.init = function() {
          return rt.emit('ready', {roomId: $routeParams.roomId});
        };
      }
    });

    rt.emit('joinRoom', $routeParams.roomId).then(function (msg) {
      $scope.room = msg.room;
      $scope.ownMark = msg.ownMark;
      if (msg.ownMark === 'X') {
        $scope.ownColor = $scope.game.xColor;
        $scope.oppColor = $scope.game.oColor;
      } else {
        $scope.ownColor = $scope.game.oColor;
        $scope.oppColor = $scope.game.xColor;
      }

      console.log('ownMark = ' + $scope.ownMark);
      if (msg.room.session != null) {
        $scope.session = msg.room.session;
        $scope.session.markCell = function(x, y) {
          return rt.emit('markCell', {roomId: $routeParams.roomId, x, y});
        };
        $scope.session.init = function() {
          return rt.emit('ready', {roomId: $routeParams.roomId});
        };
      }
    });
  })
  .directive('gameView', function($mdDialog, $location) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        scope.$watch('room.status', function(newVal) {
          if (newVal ==='waiting for a second player') {
            $mdDialog.show(
              {
                parent: element,
                template:
                '<md-dialog flex>' +
                '  <md-dialog-content>'+
                '    <h2 class="md-title">Tell a friend to join</h2>' +
                '     <md-input-container>' +
                '       <label>Address</label>' +
                '       <input disabled ng-model="address">' +
                '      </md-input-container>' +
                '  </md-dialog-content>' +
                '</md-dialog>',
                locals: {
                  address: $location.absUrl()
                },
                controller: function ($scope, address) {
                  $scope.address = address;
                }
              });
          } else if (newVal === 'started') {
            $mdDialog.hide();
          }
        });

          //console.log('here!!!');
          //console.log(newRoom);
          //
          //this.id = $routeParams.roomId;
          //$log.error(session);
          ////  $scope.session = session;
          //$scope.session = gameFactory($scope);

      }
    };
  });

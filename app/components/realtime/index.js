import angular from 'angular';
import ioClientFactory from 'socket.io-client';

angular.module('tbs.realtime', [])
  .factory('rtClient', function($rootScope) {
    const socket = ioClientFactory({
      forceNew: true,
      transports: ['websocket'],
      autoConnect: false
    });

    socket.on('error', function(error) {
      console.log('socket-error: ' + error);
    });
    socket.on('disconnect', function(reason) {
      console.log('socket-disconnect: ' + reason);
    });
    socket.io.on('connect_error', function(error) {
      console.log('socket-manager-error: ' + error);
      $rootScope.$emit('error', error.message);
    });

    return {
      connect() {
        socket.connect();
      }
    };
  });

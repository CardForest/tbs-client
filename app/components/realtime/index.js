import angular from 'angular';
import ioClientFactory from 'socket.io-client';

angular.module('tbs.realtime', [])
  .factory('rt', function ($log, $q, $window, $location) {
    const rtPort = $location.search().rtPort;
    const rtAddress = (rtPort == null && /^\d{2,4}$/.test(rtPort)) ?
                        $window.location.host :
                        $window.location.hostname + ':' + rtPort;
    const socket = ioClientFactory(rtAddress, {
      transports: ['websocket']
    });

    socket.on('error', function (error) {
      $log.error('socket-error: ' + error);
    });
    socket.on('disconnect', function (reason) {
      $log.info('socket-disconnect: ' + reason);
    });
    socket.io.on('connect_error', function (error) {
      $log.error('socket-manager-error: ' + error);
    });

    return {
      isConnected: function() {
        return socket.connected;
      },
      connect(scope) {
        scope.rt = this;

        const scopeApplyCb = function () {
          scope.$apply();
        };
        socket.on('connect', scopeApplyCb);
        socket.on('disconnect', scopeApplyCb);

        scope.$on('$destroy', function () {
          socket.removeListener('connect', scopeApplyCb);
          socket.removeListener('disconnect', scopeApplyCb);
        });

        return {
          on(msgType, cb, invokeApply = true) {
            if (invokeApply) {
              const originalCb = cb;
              cb = function () {
                const args = arguments;
                scope.$apply(function () {
                  originalCb.apply(socket, args);
                });
              };
            }

            socket.on(msgType, cb);
            scope.$on('$destroy', function () {
              socket.removeListener(msgType, cb);
            });

            return this;
          }
        };
      },
      emit(msgType, msg, returnPromise = true) {
        if (returnPromise) {
          return $q(function (resolve, reject) {
            socket.emit(msgType, msg, function (err, ack) {
              if (err != null) {
                reject(err);
              } else {
                resolve(ack);
              }
            });
          });
        } else {
          socket.emit(msgType, msg);
        }
      }
    };
  });

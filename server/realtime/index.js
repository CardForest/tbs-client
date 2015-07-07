import ioFactory from 'socket.io';

export default function realtime(http) {
  const realtime = ioFactory(http, {"transports": ["websocket"]});
  realtime.on('connection', function() {

  });

  return http;
}

import ioFactory from 'socket.io';

import MsgHandlerBuilder from './msgHandlerBuilder';

export default function realtime(http) {
  const msgHandler = new MsgHandlerBuilder()
                          .createRoom()
                          .joinRoom()
                          .markCell()
                          .ready()
                        .build();

  ioFactory(http, {"transports": ["websocket"]})
    .on('connection', function(socket) {
      msgHandler(socket);
    });

  return http;
}

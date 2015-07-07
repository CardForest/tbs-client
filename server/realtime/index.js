import ioFactory from 'socket.io';

import MsgHandlerBuilder from './msgHandlerBuilder';

export default function realtime(http) {
  const realtime = ioFactory(http, {"transports": ["websocket"]});

  const msgHandler = new MsgHandlerBuilder()
                          .welcome()
                        .build();

  realtime.on('connection', function(socket) {
    msgHandler(socket)
  });

  return http;
}

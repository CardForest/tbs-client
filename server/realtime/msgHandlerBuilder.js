class MsgHandlerBuilder {
  constructor() {
    this._selectedMsgHandlers = {};
  }

  build() {
    return (socket) => {
      for(let msgType in this._selectedMsgHandlers) {
        socket.on(msgType, this._selectedMsgHandlers[msgType]);
      }
    }
  }
}

import requireDir from 'require-dir';
import Promise from 'bluebird';

const msgHandlers = requireDir('./msgHandlers');
for(let msgType in msgHandlers) {
  if(msgHandlers.hasOwnProperty(msgType)) {
    const promiseWrappedHandler = Promise.method(msgHandlers[msgType]);
    const handler = function (msg, cb) {
      return promiseWrappedHandler.call(this, msg).asCallback(cb);
    };
    MsgHandlerBuilder.prototype[msgType] = function() {
      this._selectedMsgHandlers[msgType] = handler;
      return this;
    };
  }
}

export default MsgHandlerBuilder;

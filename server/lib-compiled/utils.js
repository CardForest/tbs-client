"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countTo = countTo;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function countTo(end) {
  return _defineProperty({}, Symbol.iterator, regeneratorRuntime.mark(function callee$1$0() {
    var i;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < end)) {
            context$2$0.next = 7;
            break;
          }

          context$2$0.next = 4;
          return i;

        case 4:
          i++;
          context$2$0.next = 1;
          break;

        case 7:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
}
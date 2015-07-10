export function countTo(end) {
  return {
    [Symbol.iterator]: function *() {
      for (let i = 0; i < end; i++) {
        yield i;
      }
    }
  };
}

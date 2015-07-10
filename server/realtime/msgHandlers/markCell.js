import store from '../../store';

export default function markCell(msg) {
  console.log('got mark cell');
  console.log(msg);
  return store.markCell(this, msg);
}

import store from '../../store';

export default function ready(msg) {
  return store.ready(this, msg);
}

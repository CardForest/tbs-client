import store from '../../store';

export default function joinRoom(roomId) {
  return store.joinRoom(this, roomId);
}

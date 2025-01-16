import { updateUserCoordinates } from '../db/user/user.db.js';
import { gameSessions, userSessions } from '../session/sessions.js';
import { getUserBySocket, removeUser } from '../session/user.session.js';

export const onEnd = (socket) => () => {
  console.log('클라이언트 연결이 종료되었습니다.');

  const user = getUserBySocket(socket);
  if(user) {
    console.log(user.id, user.x, user.y);
    updateUserCoordinates(user.id, user.x, user.y);
  }
  console.log(userSessions);
  console.log(gameSessions);
  removeUser(socket);
};
import { addUser } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { createUser, findUserByDeviceID, updateUserLogin } from '../../db/user/user.db.js';
import { gameSessions, userSessions } from '../../session/sessions.js';
import { getGameSession } from '../../session/game.session.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    //payload에 deviceId, playerId, latency들어있음
    const { deviceId, playerId, latency } = payload;

    const session = getGameSession('qwer');

    let user = await findUserByDeviceID(deviceId);

    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
    }
    
    //강제로 만든 addGameSession('qwer');에 유저 정보 넣기
    user = addUser(userId, socket);
    user.playerId = playerId;
    user.latency = latency;
    //이건뭐지?
    session.addUser(user);
    // gameSessions.addUser(user); //여기서 에러가 나는데...
    // console.log(userSessions);


    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: user.id },
      deviceId,
    );
    // console.log(initialResponse)

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;

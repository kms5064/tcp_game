 // 서버 초기화 작업
 import { loadGameAssets } from './assets.js';
 import { loadProtos } from './loadProtos.js';
 import { testAllConnections } from '../utils/db/testConnection.js';
 import pools from '../db/database.js';
import { addGameSession } from '../session/game.session.js';
 
 const initServer = async () => {
   try {
     await loadGameAssets();
     await loadProtos();
     await testAllConnections(pools);
     //여기서 게임 세션을 만들고
    addGameSession('qwer');

     //유저아이디를 세션에 넣기

     // 다음 작업
   } catch (e) {
     console.error(e);
     process.exit(1); // 오류 발생 시 프로세스 종료
   }
 };
 
 export default initServer;
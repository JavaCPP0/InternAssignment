import net from 'net';
import ClickGame from './classes/game.js';
import getGame from './instance/gameInstance.js';

const client = net.createConnection({ port: 5000 }, () => {
  console.log('TCP서버에 연결됨');
});

client.on('data', (data) => {
  console.log('서버로부터 응답:', data.toString());
});

client.on('end', () => {
  console.log('서버와의 연결 종료');
});

const playerId1 = "playerId1"; // 테스트할 플레이어 ID
const playerId2 = "playerId2"; // 테스트할 플레이어 ID

const game = getGame();

// 클릭 요청을 TCP로 전송하는 함수
const sendClickRequest = (playerId) => {
  const request = {
    type: 'CLICK_REQUEST',
    data:{
      playerId: playerId
    }
    
  };
  client.write(JSON.stringify(request));
};

const sendSigninRequest = (playerId, pw) => {
  const request = {
    type: 'LOGIN_REQUEST',
    data: {
      id: playerId,
      password: pw
    }
  };
  client.write(JSON.stringify(request));
};

sendSigninRequest(playerId1,'password123');
setTimeout(() => sendSigninRequest(playerId2,'password123'), 100);
// 클릭 처리
setTimeout(() => sendClickRequest(playerId1), 500);  // 첫 클릭
setTimeout(() => sendClickRequest(playerId1), 8000); // 0.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 16000); // 1.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 24000); // 2.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 32000); // 3.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 40000); // 4.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 48000); // 4.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 56000); // 4.5초 후 클릭

setTimeout(() => sendClickRequest(playerId2), 500); // 첫 클릭
setTimeout(() => sendClickRequest(playerId2), 500); // 0.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 1000); // 1초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 1500); // 1.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 2000); // 2초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 2500); // 2.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 3000); // 3초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 3600); // 3.6초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 3700); // 3.7초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 4300); // 4.3초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 4400); // 4.4초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 4500); // 4.5초 후 클릭 (실격 처리)
setTimeout(() => sendClickRequest(playerId2), 4600); // 4.6초 후 클릭 (실격 처리후 클릭시도)



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
    playerId: playerId
  };
  client.write(JSON.stringify(request));
};

const sendSigninRequest = (playerId,pw) => {
  const request = {
    type: 'LOGIN_REQUEST',
    id: playerId,
    password: pw

  };
  client.write(JSON.stringify(request));
};

sendSigninRequest(playerId1,'password123');
sendSigninRequest(playerId2,'password123');
// 클릭 처리
sendClickRequest(playerId1); // 첫 클릭
setTimeout(() => sendClickRequest(playerId1), 500); // 0.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 1500); // 1.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 2500); // 2.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 3500); // 3.5초 후 클릭
setTimeout(() => sendClickRequest(playerId1), 4500); // 4.5초 후 클릭

sendClickRequest(playerId2); // 첫 클릭
setTimeout(() => sendClickRequest(playerId2), 500); // 0.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 1000); // 1초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 1500); // 1.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 2000); // 2초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 2500); // 2.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 3000); // 3초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 3500); // 3.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 4000); // 4초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 4500); // 4.5초 후 클릭
setTimeout(() => sendClickRequest(playerId2), 5000); // 5초 후 클릭 (실격 처리)

// 게임 종료 후 우승자 결정
setTimeout(() => {
    const winners = game.determineWinners(); // 우승자 결정
    console.log('우승자:', winners);
}, 61000); // 1분 후 게임 종료
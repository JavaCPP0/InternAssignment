import net from 'net';
import ClickGame from './classes/game.js';

const client = net.createConnection({ port: 5000 }, () => {
  console.log('TCP서버에 연결됨');
  client.write('안녕하세요 서버!');
});

client.on('data', (data) => {
  console.log('서버로부터 응답:', data.toString());
});

client.on('end', () => {
  console.log('서버와의 연결 종료');
});

// 사용 예시
const game = new ClickGame();
const playerId1 = "playerId1"; // 테스트할 플레이어 ID
const playerId2 = "playerId2"; // 테스트할 플레이어 ID


// 유저 로그인
game.loginUser(playerId1);
game.loginUser(playerId2);

// 클릭 처리
game.handleClick(playerId1); // 첫 클릭
setTimeout(() => game.handleClick(playerId1), 500); // 0.5초 후 클릭
setTimeout(() => game.handleClick(playerId1), 1500); // 1.5초 후 클릭
setTimeout(() => game.handleClick(playerId1), 2500); // 2.5초 후 클릭
setTimeout(() => game.handleClick(playerId1), 3500); // 3.5초 후 클릭
setTimeout(() => game.handleClick(playerId1), 4500); // 4.5초 후 클릭

game.handleClick(playerId2); // 첫 클릭
setTimeout(() => game.handleClick(playerId2), 500); // 0.5초 후 클릭
setTimeout(() => game.handleClick(playerId2), 1000); // 1초 후 클릭
setTimeout(() => game.handleClick(playerId2), 1500); // 1.5초 후 클릭
setTimeout(() => game.handleClick(playerId2), 2000); // 2초 후 클릭
setTimeout(() => game.handleClick(playerId2), 2500); // 2.5초 후 클릭
setTimeout(() => game.handleClick(playerId2), 3000); // 3초 후 클릭
setTimeout(() => game.handleClick(playerId2), 3500); // 3.5초 후 클릭
setTimeout(() => game.handleClick(playerId2), 4000); // 4초 후 클릭
setTimeout(() => game.handleClick(playerId2), 4500); // 4.5초 후 클릭
setTimeout(() => game.handleClick(playerId2), 5000); // 5초 후 클릭 (실격 처리)


// 게임 종료 후 우승자 결정
setTimeout(() => {
    const winners = game.determineWinners(); // 우승자 결정
    console.log('우승자:', winners);
}, 61000); // 1분 후 게임 종료
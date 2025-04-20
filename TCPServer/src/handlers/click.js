import { clickLimit, clickWindow, gameDuration } from "../constants/game.js";
import ClickGame from "../classes/game.js";
import getGame from '../instance/gameInstance.js';

const game = getGame();

const clickQueue = {}; // 플레이어별 클릭 시간을 저장할 큐

const click = (playerId, socket) => {
  // 플레이어가 로그인되어 있는지 확인
  console.log(`click에 game이 잇을까요?${game}`);
  if (!game.isUserLoggedIn(playerId)) {
    console.log(`isUserLoggedIn는 제대로 작동하나요? ${game.isUserLoggedIn(playerId)}`);

    socket.write("서버 응답: 플레이어가 로그인되어 있지 않습니다.");
    return;
  }

  const currentTime = Date.now();
  const player = game.players[playerId];

  // 10초 동안 클릭이 없으면 실격
  if (player.lastClickTime && currentTime - player.lastClickTime > 10000) {
    player.isDisqualified = true;
    console.log(`플레이어 ${playerId}는 10초 동안 클릭이 없어 실격되었습니다.`);
    socket.write("서버 응답: 10초 동안 클릭이 없어 실격되었습니다.");
    return;
  }

  // 클릭 수 증가
  player.incrementClick();

  // 클릭 시간 큐 관리
  if (!clickQueue[playerId]) {
    clickQueue[playerId] = [];
  }

  // 큐에 새 클릭 시간 추가
  clickQueue[playerId].push(currentTime);

  // 큐의 길이가 6 이상이면 첫 번째 클릭 시간 제거
  if (clickQueue[playerId].length > 5) {
    clickQueue[playerId].shift(); // 첫 번째 클릭 시간 제거
  }

  // 큐의 길이가 5일 때만 부정행위 체크
  if (clickQueue[playerId].length === 5) {
    const firstClickTime = clickQueue[playerId][0];
    const fifthClickTime = clickQueue[playerId][4];

    // 첫 번째와 다섯 번째 클릭 시간 비교
    if (fifthClickTime - firstClickTime < 1000) {
      // 부정행위로 간주
      player.isDisqualified = true;
      console.log(`플레이어 ${playerId}는 부정행위로 실격되었습니다.`);
      socket.write("서버 응답: 부정행위로 실격되었습니다.");
      return;
    }
  }

  // 1초 동안 클릭 수 체크
  if (currentTime - player.startTime < clickWindow) {
    if (player.clickCount > clickLimit) {
      // 실격 처리
      player.isDisqualified = true;
      console.log(
        `플레이어 ${playerId}는 1초 동안 ${clickLimit}회를 초과하여 실격되었습니다.`
      );
      socket.write(
        `서버 응답: 1초 동안 ${clickLimit}회를 초과하여 실격되었습니다.`
      );
    }
  } else {
    // 클릭 윈도우 초기화
    player.startTime = currentTime;
    player.clickCount = 1; // 현재 클릭 수 초기화
  }

  socket.write(`서버 응답: 클릭 성공! 현재 클릭 수: ${player.clickCount}`);
};

export default click;

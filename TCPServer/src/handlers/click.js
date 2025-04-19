import { database } from '../../../DB/DataBase.js'; // 데이터베이스 연결
import { clickLimit, clickWindow, gameDuration } from '../constants/game.js';

const clickQueue = {}; // 플레이어별 클릭 시간을 저장할 큐

const click = (playerId) => {
    // 데이터베이스에서 플레이어 정보 가져오기
    const playerQuery = database.prepare('SELECT * FROM User WHERE ID = ?');
    const player = playerQuery.get(playerId);

    if (!player || player.Disqualification) {
        console.log(`플레이어 ${playerId}는 게임에 참여할 수 없습니다.`);
        return;
    }

    const currentTime = Date.now();

    // 10초 동안 클릭이 없으면 실격
    if (player.lastClickTime && currentTime - player.lastClickTime > 10000) {
        // 실격 처리
        const updateQuery = database.prepare('UPDATE User SET Disqualification = 1 WHERE ID = ?');
        updateQuery.run(playerId);
        console.log(`플레이어 ${playerId}는 10초 동안 클릭이 없어 실격되었습니다.`);
        return;
    }

    // 클릭 수 증가
    player.clickCount++;
    player.lastClickTime = currentTime;

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
            const updateQuery = database.prepare('UPDATE User SET Disqualification = 1 WHERE ID = ?');
            updateQuery.run(playerId);
            console.log(`플레이어 ${playerId}는 부정행위로 실격되었습니다.`);
            return;
        }
    }

    // 클릭 기록 저장
    recordClick(playerId, player.clickCount);

    // 1초 동안 클릭 수 체크
    if (currentTime - player.startTime < clickWindow) {
        if (player.clickCount > clickLimit) {
            // 실격 처리
            const updateQuery = database.prepare('UPDATE User SET Disqualification = 1 WHERE ID = ?');
            updateQuery.run(playerId);
            console.log(`플레이어 ${playerId}는 1초 동안 ${clickLimit}회를 초과하여 실격되었습니다.`);
        }
    } else {
        // 클릭 윈도우 초기화
        player.startTime = currentTime;
        player.clickCount = 1; // 현재 클릭 수 초기화
    }
};

export default click;
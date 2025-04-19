import { database } from "../../../DB/DataBase.js"; // 데이터베이스 연결

class ClickGame {
  constructor() {
    this.players = {}; // 플레이어 정보를 저장할 객체
  }

  // 로그인된 유저 확인
  isUserLoggedIn(playerId) {
    const playerQuery = database.prepare("SELECT * FROM User WHERE ID = ?");
    const player = playerQuery.get(playerId);
    return player && !player.Disqualification;
  }

  // 유저 로그인 처리
  loginUser(playerId) {
    if (!this.players[playerId]) {
      this.players[playerId] = {
        clickCount: 0,
        lastClickTime: null,
        startTime: Date.now(),
      };
      console.log(`플레이어 ${playerId}가 로그인되었습니다.`);
    } else {
      console.log(`플레이어 ${playerId}는 이미 로그인 상태입니다.`);
    }
  }

  // 클릭 수를 데이터베이스에 저장
  saveClickCounts() {
    for (const playerId in this.players) {
      const player = this.players[playerId];
      if (!player.disqualified) {
        const updateQuery = database.prepare(
          "UPDATE User SET ClickCount = ClickCount + ? WHERE ID = ?"
        );
        updateQuery.run(player.clickCount, playerId);
        console.log(
          `플레이어 ${playerId}의 클릭 수 ${player.clickCount}가 데이터베이스에 저장되었습니다.`
        );
      }
    }
  }

    // 우승자 결정 및 정보 출력
    determineWinners() {
        const query = database.prepare("SELECT ID, Addr, ClickCount FROM User WHERE Disqualification = 0");
        const players = query.all();

        // 클릭 수로 정렬
        players.sort((a, b) => b.ClickCount - a.ClickCount);

        const maxClicks = players[0] ? players[0].ClickCount : 0;
        const winners = players.filter(player => player.ClickCount === maxClicks);

        // 우승자 정보 출력
        winners.forEach(winner => {
            console.log(`우승자: ID=${winner.ID}, 주소=${winner.Addr}, 클릭 횟수=${winner.ClickCount}`);
        });

        return winners.map(winner => winner.ID); // 우승자 ID 반환
    }

  endGame() {
    console.log("게임 종료");
    const winners = this.determineWinners();
    if (winners.length > 0) {
      console.log("우승자:", winners);
      this.saveClickCounts(); // 클릭 수를 데이터베이스에 저장
    } else {
      console.log("우승자가 없습니다.");
    }
  }
}

// 사용 예시
const game = new ClickGame();
game.loginUser("player1"); // 유저 로그인
game.handleClick("player1"); // 클릭 처리
setTimeout(() => game.handleClick("player1"), 500); // 0.5초 후 클릭
setTimeout(() => game.handleClick("player1"), 1500); // 1.5초 후 클릭
setTimeout(() => game.handleClick("player1"), 2500); // 2.5초 후 클릭
setTimeout(() => game.handleClick("player1"), 3500); // 3.5초 후 클릭
setTimeout(() => game.handleClick("player1"), 4500); // 4.5초 후 클릭

// 게임 종료 후 우승자 결정
setTimeout(() => game.endGame(), 61000); // 1분 후 게임 종료

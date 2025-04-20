import { database } from "../../../DB/DataBase.js"; // 데이터베이스 연결
import Player from "./player.js";

class ClickGame {
  constructor() {
    this.players = {}; // 플레이어 정보를 저장할 객체
  }

  // 로그인된 유저 확인
  isUserLoggedIn(playerId) {
    return this.players[playerId] && !this.players[playerId].isDisqualified;
  }

  // 유저 로그인 처리
  loginUser(playerId) {
    if (!this.players[playerId]) {
      this.players[playerId] = new Player();

      console.log(`플레이어 ${playerId}가 로그인되었습니다.`);
    } else {
      console.log(`플레이어 ${playerId}는 이미 로그인 상태입니다.`);
    }
  }

  // 우승자 결정 및 정보 출력
  determineWinners() {
    //플레이어들 중에서 우승자 결정
    const activePlayers = Object.entries(this.players)
      .filter(([_, player]) => !player.isDisqualified)
      .map(([id, player]) => ({
        ID: id,
        clickCount: player.clickCount,
        lastClickTime: player.lastClickTime
      }));

    // 클릭 수로 정렬
    activePlayers.sort((a, b) => b.clickCount - a.clickCount);

    const maxClicks = activePlayers[0] ? activePlayers[0].clickCount : 0;
    const potentialWinners = activePlayers.filter((player) => player.clickCount === maxClicks);

    // 마지막 클릭 시간이 가장 빠른 사람을 우승자로 선택
    const winner = potentialWinners.reduce((prev, current) => {
      return (prev.lastClickTime < current.lastClickTime) ? prev : current;
    });

    if (winner) {
      // 우승자의 주소를 데이터베이스에서 조회
      const addressQuery = database.prepare("SELECT Addr FROM User WHERE ID = ?");
      const winnerInfo = addressQuery.get(winner.ID);

      console.log(
        `우승자: ID=${winner.ID}, 주소=${winnerInfo.Addr}, 클릭 횟수=${winner.clickCount}, 마지막 클릭 시간=${winner.lastClickTime}`
      );
      return [winner.ID];
    }

    console.log("우승자가 없습니다.");
    return [];
  }

  endGame() {
    console.log("게임 종료");
    const winners = this.determineWinners();
    if (winners.length > 0) {
      console.log("우승자:", winners);
    } else {
      console.log("우승자가 없습니다.");
    }
  }
}

export default ClickGame;
const endGame=()=> {
    console.log("게임 종료");
    const winners = this.determineWinners();
    if (winners.length > 0) {
      console.log("우승자:", winners);
    } else {
      console.log("우승자가 없습니다.");
    }
  }
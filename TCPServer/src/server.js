import net from "net";
import { TCPPORT, HOST } from "./constants/env.js";
import onConnection from "../src/events/onConnection.js";
import getGame from './instance/gameInstance.js';

// TCP 서버 생성 및 실행
const server = () => {
  const tcpServer = net.createServer(onConnection);
  tcpServer.listen(TCPPORT, HOST, () => {
    console.log("TCP 서버 실행 중", TCPPORT);
  });
  
  const game = getGame();
  // 게임 종료 후 우승자 결정
  setTimeout(() => {
    const winners = game.determineWinners(); // 우승자 결정

    console.log("우승자:", winners);
  }, 61000); // 1분 후 게임 종료
};

// 서버 실행
server();

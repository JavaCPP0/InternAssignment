// TCPServer/src/server.js
import net from 'net';
import { TCPPORT, HOST } from './constants/env.js';
import onConnection from '../src/Events/onConnection.js';

// TCP 서버 생성 및 실행
function server() {
  const tcpServer = net.createServer(onConnection);

  tcpServer.listen(TCPPORT, HOST, () => {
    console.log('TCP 서버 실행 중', TCPPORT);
  });
}

// 서버 실행
server();
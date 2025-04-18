const net = require('net');
const { TCPPORT, HOST } = require('./constants/env');
const { default: onConnection } = require('./Events/onConnection');

// TCP 서버 생성 및 실행
function server() {
  const tcpServer = net.createServer(onConnection);

  tcpServer.listen(TCPPORT, HOST, () => {
    console.log('TCP 서버 실행 중', TCPPORT);
  });
}

// 서버 실행
server();

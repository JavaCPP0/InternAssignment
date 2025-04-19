const http = require('http');

const { HTTPPORT } = require('./constants/env');
const { initializeDatabase } = require('./DB/DataBase');
import onHttpRequest from './Events/onHttpRequest.js'; // HTTP 요청 핸들러 가져오기

// 데이터베이스 초기화
initializeDatabase();

// HTTP 서버 생성
const server = http.createServer(onHttpRequest);

// 서버 실행
server.listen(HTTPPORT, () => {
  console.log(`HTTP 서버 실행 중 ${HTTPPORT}`);
});

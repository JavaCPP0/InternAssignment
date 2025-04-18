const http = require('http');

const { HTTPPORT } = require('./constants/env');
const { initializeDatabase } = require('./DB/DataBase');

// 데이터베이스 초기화
initializeDatabase();

// HTTP 서버 생성
const server = http.createServer();

server.listen(HTTPPORT, () => {
  console.log('HTTP 서버 실행 중 ',HTTPPORT );
});

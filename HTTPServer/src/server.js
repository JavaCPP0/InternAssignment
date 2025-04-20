import http from 'http';
import { HTTPPORT } from '../../HTTPServer/src/constants/env.js';
import { initializeDatabase } from '../../DB/DataBase.js';
import onConnection from '../src/events/onConnection.js'; // HTTP 요청 핸들러 가져오기

// 데이터베이스 초기화
initializeDatabase();

// HTTP 서버 생성
const server = http.createServer(onConnection);

// 서버 실행
server.listen(HTTPPORT, () => {
  console.log(`HTTP 서버 실행 중 ${HTTPPORT}`);
});
const http = require('http');
const { database } = require('../DB/DataBase'); // db.js에서 database 가져오기

// 회원가입 처리
const handleSignup = (req, res)=> {
  if (req.method === 'POST' && req.url === '/signup') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();  // 데이터 받기
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);  // JSON 파싱

        // 회원가입 정보 DB에 삽입
        const stmt = database.prepare('INSERT INTO User (ID, PassWord) VALUES (?, ?)');
        stmt.run(data.id, data.password);
        stmt.finalize();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: '회원가입 완료!' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '잘못된 JSON 형식입니다.' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}

module.exports = { handleSignup };

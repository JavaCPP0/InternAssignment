'use strict';
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync(':memory:');

// User 테이블 생성 (UserId 자동 증가)
function initializeDatabase() {
    database.exec(`
      CREATE TABLE IF NOT EXISTS User (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT,
        ID TEXT NOT NULL,
        PassWord TEXT NOT NULL,
        Disqualification INTEGER DEFAULT 0
      );
    `);
    console.log('데이터베이스 초기화 완료');
  }
  


// INSERT 준비 (UserId는 생략해서 자동 증가되게 함)
const insert = database.prepare(`
  INSERT INTO User (ID, PassWord, Addr, ClickCount, Disqualification)
  VALUES (?, ?, ?, ?, ?)
`);

// INSERT 실행 test code
insert.run('12345', 'abc123', 'Seoul', 10, 1);
insert.run('67890', 'qwerty', 'Busan', 25, 0);

// 유저의 자격요건 확인하기
const checkStatus = database.prepare('SELECT Disqualification FROM User WHERE ID = ?');

const userIdToCheck = 12345;
const Disqualification = checkStatus.get(userIdToCheck);

console.log(result);  // { Disqualification: 0 } 또는 { Disqualification: 1 }

// SELECT 준비 및 실행
const query = database.prepare('SELECT * FROM User ORDER BY UserId');
console.log(query.all());

const result = query.all();

result.forEach(row => {
    console.log(row.ID);
});

module.exports = { database, initializeDatabase };

'use strict';
import { DatabaseSync } from 'node:sqlite';
export const database = new DatabaseSync('./database.sqlite');


// User 테이블 생성 (UserId 자동 증가)
export const initializeDatabase = () => {
    database.exec(`
      CREATE TABLE IF NOT EXISTS User (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT,
        ID TEXT NOT NULL,
        PassWord TEXT NOT NULL,
        Addr TEXT NOT NULL
      );
    `);
    console.log('데이터베이스 초기화 완료');
};

const { database } = require('../DB/DataBase'); // db.js에서 database 가져오기

// 회원가입 처리
const handleSignup = (request, res) => {
    const { id, password, addr } = request.data; // 요청에서 데이터 추출

    // 회원가입 정보 DB에 삽입
    const info = database.prepare('INSERT INTO User (ID, PassWord, Addr) VALUES (?, ?, ?)');
    info.run(id, password, addr);
    info.finalize();

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '회원가입 완료!' }));
};

export { handleSignup };

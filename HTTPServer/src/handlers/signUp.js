import { database } from '../../../DB/DataBase.js';

// 회원가입 처리
const signup = (request, res) => {
    console.log("회원가입 핸들러 호출됨");
    const { id, password, addr } = request.data; // 요청에서 데이터 추출

    // ID 중복 체크
    const checkIdQuery = database.prepare('SELECT COUNT(*) as count FROM User WHERE ID = ?');
    const result = checkIdQuery.get(id);

    if (result.count > 0) {
        // ID가 이미 존재하는 경우
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '이미 사용 중인 ID입니다.' }));
        return; // 함수 종료
    }

    // 회원가입 정보 DB에 삽입
    const info = database.prepare('INSERT INTO User (ID, PassWord, Addr) VALUES (?, ?, ?)');
    info.run(id, password, addr);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '회원가입 완료!' }));

    const query = database.prepare('SELECT * FROM User');
    console.log(query.all());
};

export { signup };

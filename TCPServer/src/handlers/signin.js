import { database } from '../../../DB/DataBase.js';
import getGame from '../instance/gameInstance.js';


// 로그인 처리
const signin = (request, socket) => {
    console.log("로그인 핸들러 호출됨");
    const { id, password } = request.data; // 요청에서 데이터 추출

    const game = getGame();

    // ID와 비밀번호 확인
    const query = database.prepare('SELECT * FROM User WHERE ID = ? AND PassWord = ?');
    const user = query.get(id, password);

    if (user) {
        // 로그인 성공
        const check = game.loginUser(id);
        console.log(`로그인할때 등록 체크${JSON.stringify(check)}`);
        socket.write(JSON.stringify({ message: '로그인 성공!', userId: user.UserId }));

    } else {
        // 로그인 실패
        socket.write(JSON.stringify({ error: 'ID 또는 비밀번호가 잘못되었습니다.' }));
    }
};

export { signin };
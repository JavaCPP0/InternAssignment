import handlers from '../handlers/index.js'; // 핸들러 가져오기
import onEnd from "./onEnd.js";
import onError from "./onError.js";

const onData = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString(); // 데이터 수신
    });

    req.on('end', () => {
        try {
            const requestData = JSON.parse(body); // JSON 파싱
            const handler = handlers[requestData.type]; // 요청 타입에 따라 핸들러 선택
            if (handler) {
                const [_, handle] = handler;
                handle(requestData, res); // 핸들러 호출
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '요청을 처리할 수 없습니다.' }));
            }
        } catch (e) {
            onError(req, res, e); // 오류 발생 시 onError 호출
        }
    });

    req.on('error', (error) => {
        onError(req, res, error); // 요청 중 오류 발생 시 onError 호출
    });
};

export default onData;
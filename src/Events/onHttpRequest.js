import handlers from '../handlers/index.js';

const onHttpRequest = (req, res) => {
    let body = '';

    // 요청 본문 데이터 수신
    req.on('data', chunk => {
        body += chunk.toString(); // 데이터 수신
    });

    req.on('end', () => {
        try {
            const requestData = JSON.parse(body); // JSON 파싱

            // 요청 핸들링
            const handler = handlers[requestData.type]; // 요청 타입에 따라 핸들러 선택
            if (handler) {
                const [_, handle] = handler;
                handle(requestData, res); // 핸들러 호출
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '요청을 처리할 수 없습니다.' }));
            }
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: '잘못된 JSON 형식입니다.' }));
        }
    });
};

export default onHttpRequest; 
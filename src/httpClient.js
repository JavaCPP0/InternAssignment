const http = require('http');

// HTTP 클라이언트 요청 함수
const httpClientRequest = (data)=> {
    const options = {
        hostname: 'localhost',
        port: 3000, // HTTP 서버 포트
        path: '/signup', // 회원가입 경로
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const req = http.request(options, (res) => {
        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk.toString();
        });

        res.on('end', () => {
            console.log('서버 응답:', responseBody);
        });
    });

    req.on('error', (error) => {
        console.error('HTTP 요청 에러:', error.message);
    });

    // 요청 본문에 데이터 전송 (type 필드 추가)
    const requestData = {
        type: 'REGISTER_REQUEST', // 요청 타입 추가
        data: data // 실제 데이터
    };

    req.write(JSON.stringify(requestData));
    req.end();
}

// 사용 예시
const userData = {
    id: 'user123',
    password: 'password123',
    addr: 'seoul',
};

httpClientRequest(userData); 
import http from 'http';

// HTTP 클라이언트 요청 함수
const httpClientRequest = (data, requestType) => {
    const options = {
        hostname: 'localhost',
        port: 3000, // HTTP 서버 포트
        path: requestType === 'REGISTER_REQUEST' ? '/signup' : '/login', // 경로 설정
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
            // 회원가입 후 로그인 요청
            if (requestType === 'REGISTER_REQUEST') {
                const loginData = {
                    id: data.id, // 회원가입 시 사용한 ID
                    password: data.password, // 회원가입 시 사용한 비밀번호
                };
                httpClientRequest(loginData, 'LOGIN_REQUEST'); // 로그인 요청
            }
        });
    });

    req.on('error', (error) => {
        console.error('HTTP 요청 에러:', error.message);
    });

    // 요청 본문에 데이터 전송 (type 필드 추가)
    const requestData = {
        type: requestType, // 요청 타입 추가
        data: data // 실제 데이터
    };

    req.write(JSON.stringify(requestData));
    req.end();
};

// 회원가입 요청 예시
const signupData1 = {
    id: 'playerId1',
    password: 'password123',
    addr: 'seoul',
};

const signupData2 = {
    id: 'playerId2',
    password: 'password123',
    addr: 'seoul',
};

httpClientRequest(signupData1, 'REGISTER_REQUEST'); // 회원가입 요청
httpClientRequest(signupData2, 'REGISTER_REQUEST'); // 회원가입 요청

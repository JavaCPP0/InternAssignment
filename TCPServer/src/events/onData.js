import handlers from '../handlers/index.js';

const onData = (socket, data) => {
    const message = data.toString();
    console.log('받은 메시지:', message);

    // 요청을 JSON으로 파싱
    let request;
    try {
        request = JSON.parse(message);
    } catch (e) {
        socket.write('서버 응답: 잘못된 JSON 형식입니다.');
        return;
    }

    // 요청 핸들링
    const handler = handlers[request.type]; // 요청 타입에 따라 핸들러 선택
    if (handler) {
        const [_, handle] = handler;
        handle(request, socket); // 핸들러 호출
    } else {
        socket.write('서버 응답: 요청을 처리할 수 없습니다.');
    }
};

export default onData;
const onError = (req, res, error) => {
    if (error) {
        console.error('HTTP 요청 중 에러 발생:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '서버 오류가 발생했습니다.' }));
    } else {
        console.error('알 수 없는 오류 발생');
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '서버 오류가 발생했습니다.' }));
    }
};

export default onError;
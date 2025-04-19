const onEnd=(socket)=> {
    console.log('클라이언트 연결 종료');

    socket.end();
    socket.destroy();
  }

  export default onEnd;

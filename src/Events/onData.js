const onData = (socket, data)=> {
    const message = data.toString();
    console.log('받은 메시지:', message);
  
    // 클라이언트에 응답
    socket.write('서버 응답: ' + message);
  }

  export default onData;
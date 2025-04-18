const onError=(socket, error)=> {
    console.error('에러 발생:', error.message);

    socket.end();
    socket.destroy();
  }

  export default onError;

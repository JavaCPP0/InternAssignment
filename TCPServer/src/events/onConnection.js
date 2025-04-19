import onData from './onData.js';
import onEnd from './onEnd.js';
import onError from './onError.js';

const onConnection = (socket)=> {
    console.log('클라이언트 접속됨');
  
    socket.on('data', (data) => onData(socket, data));
    socket.on('end', () => onEnd(socket));
    socket.on('error', (err) => onError(socket, err));
  }

  export default onConnection;
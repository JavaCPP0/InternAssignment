const net = require('net');

const client = net.createConnection({ port: 5000 }, () => {
  console.log('TCP서버에 연결됨');
  client.write('안녕하세요 서버!');
});

client.on('data', (data) => {
  console.log('서버로부터 응답:', data.toString());
});

client.on('end', () => {
  console.log('서버와의 연결 종료');
});

import WebSocket from 'ws';

function NetworkController() {
  const wss = new WebSocket.Server({
    port: 8080,
    // perMessageDeflate: false,
  });

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      console.log(data);
      ws.send('mkey');
    });

    ws.send('Hi, friend!');
  });
}

export default NetworkController;

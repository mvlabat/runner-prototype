import UpdatableInterface from 'common/Interfaces/UpdatableInterface';

function NetworkController() {
  const socket = new WebSocket(process.env.WEBSOCKET_ADDRESS);

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {},
  });

  socket.addEventListener('open', () => {
    socket.send('Hello server!');
  });

  socket.addEventListener('message', (event) => {
    console.log(event.data);
  });
}

export default NetworkController;

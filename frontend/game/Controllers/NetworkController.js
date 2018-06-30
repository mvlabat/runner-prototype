import UpdatableInterface from 'common/Interfaces/UpdatableInterface';
import NetworkControllerInterface from 'common/Interfaces/NetworkControllerInterface';
import NetworkMessageSystem from 'common/Systems/NetworkMessageSystem';
import BroadcastActionMessage from 'common/NetworkMessages/BroadcastActionMessage';
import { deserialize, serialize } from 'common/Utils/JsonSerializationHelper';
import { log } from 'common/Utils/Debug';
import ClientNetworkMessageSystem from '../Systems/ClientNetworkMessageSystem';

/**
 * @param {ActionController} actionController
 * @param {PlayerModel} playerModel
 * @constructor
 */
function NetworkController(actionController, playerModel) {
  const socket = new WebSocket(process.env.WEBSOCKET_ADDRESS);
  const clientNetworkMessageSystem = new ClientNetworkMessageSystem(actionController, playerModel);
  const networkMessageSystem = new NetworkMessageSystem(actionController);
  const messageQueue = [];

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {},
  });

  this.networkControllerInterface = new NetworkControllerInterface(this, {
    broadcastAction: (action) => {
      if (action.broadcastedActionInterface.getSenderId() === null) {
        const message = new BroadcastActionMessage(action);
        const serializedMessage = JSON.stringify(serialize(message));
        console.log(serializedMessage);
        if (socket.readyState === socket.OPEN) {
          socket.send(serializedMessage);
        } else {
          messageQueue.push(serializedMessage);
        }
      }
    },
  });

  socket.addEventListener('open', () => {
    log('Connected to the server.');
    const messages = messageQueue.splice(0, messageQueue.length);
    messages.reverse();
    for (const message of messages) {
      socket.send(message);
    }
  });

  socket.addEventListener('message', (event) => {
    try {
      const message = deserialize(JSON.parse(event.data));
      if (clientNetworkMessageSystem.systemInterface.canProcess(message)) {
        clientNetworkMessageSystem.systemInterface.process(message);
      } else if (networkMessageSystem.systemInterface.canProcess(message)) {
        networkMessageSystem.systemInterface.process(message);
      }
    } catch (e) {
      log(`Not processable message: ${e.message}`);
    }
  });
}

export default NetworkController;

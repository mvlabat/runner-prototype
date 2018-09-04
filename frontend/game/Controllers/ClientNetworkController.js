import UpdatableInterface from 'common/Interfaces/UpdatableInterface';
import NetworkControllerInterface from 'common/Interfaces/NetworkControllerInterface';
import NetworkMessageSystem from 'common/Systems/NetworkMessageSystem';
import BroadcastActionMessage from 'common/NetworkMessages/BroadcastActionMessage';
import { log } from 'common/Utils/Debug';
import PsonSerializationHelper from 'common/Utils/PsonSerializationHelper';
import ClientNetworkMessageSystem from '../Systems/ClientNetworkMessageSystem';

/**
 * @param {ActionController} actionController
 * @param {PlayerModel} playerModel
 * @constructor
 */
function ClientNetworkController(actionController, playerModel) {
  const ws = new WebSocket(process.env.WEBSOCKET_ADDRESS);
  ws.binaryType = 'arraybuffer';
  const clientNetworkMessageSystem = new ClientNetworkMessageSystem(
    ws,
    actionController,
    playerModel,
  );
  const networkMessageSystem = new NetworkMessageSystem(actionController);
  const messageQueue = [];

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {},
  });

  this.networkControllerInterface = new NetworkControllerInterface(this, {
    broadcastAction: (action) => {
      if (action.broadcastedActionInterface.getSenderId() === null) {
        this.send(new BroadcastActionMessage(action));
      }
    },
  });

  this.send = (message) => {
    const serializedMessage = PsonSerializationHelper.serialize(message);
    if (ws.readyState === ws.OPEN) {
      ws.send(serializedMessage);
    } else {
      messageQueue.push(serializedMessage);
    }
  };

  ws.addEventListener('open', () => {
    log('Connected to the server.');
    const messages = messageQueue.splice(0, messageQueue.length);
    messages.reverse();
    for (const message of messages) {
      ws.send(message);
    }
  });

  ws.addEventListener('message', (event) => {
    try {
      const message = PsonSerializationHelper.deserialize(event.data);
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

export default ClientNetworkController;

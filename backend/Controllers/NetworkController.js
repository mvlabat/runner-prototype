import WebSocket from 'ws';

import NetworkControllerInterface from 'common/Interfaces/NetworkControllerInterface';
import BroadcastActionMessage from 'common/NetworkMessages/BroadcastActionMessage';
import { deserialize, serialize } from 'common/Utils/JsonSerializationHelper';
import NetworkMessageSystem from 'common/Systems/NetworkMessageSystem';
import AuthenticationResponseMessage from 'common/NetworkMessages/AuthenticationResponseMessage';
import { log } from 'common/Utils/Debug';
import GameStateMessage from 'common/NetworkMessages/GameStateMessage';

/**
 * @param {ActionController} actionController
 * @param {GameState} gameState
 * @constructor
 */
function NetworkController(actionController, gameState) {
  const activePlayers = new Map();
  let clientIdCount = 0;
  const wss = new WebSocket.Server({
    port: 8080,
    // perMessageDeflate: false,
  });
  const networkMessageSystem = new NetworkMessageSystem(actionController);

  wss.on('connection', (ws, req) => {
    log(`A new player has connected (${req.connection.remoteAddress})`);

    ws.on('message', (data) => {
      try {
        const serializedMessage = JSON.parse(data);
        serializedMessage.senderId = activePlayers.get(ws);

        const message = deserialize(serializedMessage);

        if (networkMessageSystem.systemInterface.canProcess(message)) {
          networkMessageSystem.systemInterface.process(message);
        }
      } catch (e) {
        log(`Not processable message: ${e.message}`);
        throw e;
      }
    });

    const message = new AuthenticationResponseMessage(clientIdCount);
    activePlayers.set(ws, clientIdCount);
    clientIdCount += 1;
    send(ws, message);

    const gameStateMessage = new GameStateMessage(
      gameState.getAllPlayers(),
      gameState.getAllBuildableObjects(),
    );
    send(ws, gameStateMessage);
  });

  this.networkControllerInterface = new NetworkControllerInterface(this, {
    broadcastAction: (action) => {
      for (const ws of wss.clients) {
        const message = new BroadcastActionMessage(action);
        send(ws, message);
      }
    },
  });

  function send(ws, message) {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(serialize(message)));
    } else {
      log('Tried to send a message via a socket that was not OPEN');
    }
  }
}

export default NetworkController;

import WebSocket from 'ws';

import NetworkControllerInterface from 'common/Interfaces/NetworkControllerInterface';
import BroadcastActionMessage from 'common/NetworkMessages/BroadcastActionMessage';
import NetworkMessageSystem from 'common/Systems/NetworkMessageSystem';
import AuthenticationResponseMessage from 'common/NetworkMessages/AuthenticationResponseMessage';
import { log } from 'common/Utils/Debug';
import GameStateMessage from 'common/NetworkMessages/GameStateMessage';
import PlayerModel from 'common/Models/PlayerModel';
import UpdatableInterface from 'common/Interfaces/UpdatableInterface';
import { assertInterface } from 'common/Utils/InterfaceImplementation';
import NetworkMessageInterface from 'common/Interfaces/NetworkMessageInterface';
import { send } from 'common/Utils/NetworkUtils';
import PsonSerializationHelper from 'common/Utils/PsonSerializationHelper';

import ServerNetworkMessageSystem from '../Systems/ServerNetworkMessageSystem';
import ClientsRegistry from '../Registries/ClientsRegistries';

/**
 * @param {ActionController} actionController
 * @param {GameState} gameState
 * @constructor
 */
function NetworkController(actionController, gameState) {
  let clientIdCount = 0;

  const wss = new WebSocket.Server({
    port: 8080,
    // perMessageDeflate: false,
  });
  const serverNetworkMessageSystem = new ServerNetworkMessageSystem(actionController);
  const networkMessageSystem = new NetworkMessageSystem(actionController);

  this.updatableInterface = new UpdatableInterface(this, {
    update: (timeDelta) => {
      serverNetworkMessageSystem.updatableInterface.update(timeDelta);
    },
  });

  wss.on('connection', (ws, req) => {
    log(`A new player has connected: (${req.connection.remoteAddress})`);

    ws.on('message', (data) => {
      try {
        const message = PsonSerializationHelper.deserialize(data);

        const senderId = ClientsRegistry.getPlayerBySocket(ws).clientId;
        assertInterface(message.networkMessageInterface, NetworkMessageInterface);
        message.networkMessageInterface.setSenderId(senderId);

        if (serverNetworkMessageSystem.systemInterface.canProcess(message)) {
          serverNetworkMessageSystem.systemInterface.process(message);
        } else if (networkMessageSystem.systemInterface.canProcess(message)) {
          networkMessageSystem.systemInterface.process(message);
        }
      } catch (e) {
        log(`Not processable message: ${e.message}`);
        throw e;
      }
    });

    ws.on('close', (closeCode, closeMessage) => {
      const reason = closeMessage ? `: ${closeMessage}` : '';
      const { clientId } = ClientsRegistry.getPlayerBySocket(ws);
      log(`Connection with Player (${clientId}) has been closed (code ${closeCode})${reason}`);
    });

    const message = new AuthenticationResponseMessage(clientIdCount);
    const player = new PlayerModel(clientIdCount);
    ClientsRegistry.registerClient(player, ws);
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
}

export default NetworkController;

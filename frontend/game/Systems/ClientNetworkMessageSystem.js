import SystemInterface from 'common/Interfaces/SystemInterface';
import AuthenticationResponseMessage from 'common/NetworkMessages/AuthenticationResponseMessage';
import GameStateMessage from 'common/NetworkMessages/GameStateMessage';
import SpawnPlayerAction from 'common/Actions/SpawnPlayerAction';
import SaveBuildableObjectAction from 'common/Actions/SaveBuildableObjectAction';
import PingMessage from 'common/NetworkMessages/PingMessage';
import { log } from 'common/Utils/Debug';
import PongMessage from 'common/NetworkMessages/PongMessage';
import { send } from 'common/Utils/NetworkUtils';
import BroadcastPlayersLatencyMessage from 'common/NetworkMessages/BroadcastPlayersLatencyMessage';
import PlayerLoggedInMessage from 'common/NetworkMessages/PlayerLoggedInMessage';
import PlayerLoggedOutMessage from 'common/NetworkMessages/PlayerLoggedOutMessage';

/**
 * @param {WebSocket} ws
 * @param {ActionController} actionController
 * @param {PlayerModel} playerModel
 * @constructor
 */
function ClientNetworkMessageSystem(ws, actionController, playerModel) {
  const parameters = { playerModel };
  const messageProcessors = new Map([
    [AuthenticationResponseMessage, processAuthenticationResponse],
    [BroadcastPlayersLatencyMessage, () => {}],
    [GameStateMessage, processGameStateMessage],
    [PingMessage, processPingMessage],
    [PlayerLoggedInMessage, () => {}],
    [PlayerLoggedOutMessage, () => {}],
  ]);

  this.systemInterface = new SystemInterface(this, {
    canProcess: message => messageProcessors.has(message.constructor),

    process: message => messageProcessors.get(message.constructor)(message),
  });

  /**
   * @param {AuthenticationResponseMessage} message
   */
  function processAuthenticationResponse(message) {
    parameters.playerModel.clientId = message.getResponse();
    if (typeof message.getResponse() === 'number') {
      parameters.playerModel.authenticated = true;
    }
  }

  /**
   * @param {GameStateMessage} message
   */
  function processGameStateMessage(message) {
    for (const player of message.getPlayerObjects()) {
      const spawnPlayerAction = new SpawnPlayerAction(player, 0, -1);
      actionController.addAction(spawnPlayerAction);
    }
    for (const buildableObject of message.getBuildableObjects()) {
      const spawnBuildableObjectAction = new SaveBuildableObjectAction(buildableObject, 0, -1);
      actionController.addAction(spawnBuildableObjectAction);
    }
  }

  /**
   * @param {PingMessage} message
   */
  function processPingMessage(message) {
    parameters.playerModel.latency = message.getLastLatency();
    const pongMessage = new PongMessage(message.getPingId());
    send(ws, pongMessage);
    log(`Ping: ${message.getLastLatency()}`);
  }
}

export default ClientNetworkMessageSystem;

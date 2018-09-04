import SystemInterface from 'common/Interfaces/SystemInterface';
import AuthenticationResponseMessage from 'common/NetworkMessages/AuthenticationResponseMessage';
import GameStateMessage from 'common/NetworkMessages/GameStateMessage';
import SpawnPlayerAction from 'common/Actions/SpawnPlayerAction';
import SaveBuildableObjectAction from 'common/Actions/SaveBuildableObjectAction';
import PingMessage from 'common/NetworkMessages/PingMessage';
import PongMessage from 'common/NetworkMessages/PongMessage';
import { send } from 'common/Utils/NetworkUtils';
import BroadcastPlayersLatencyMessage from 'common/NetworkMessages/BroadcastPlayersLatencyMessage';
import PlayerLoggedInMessage from 'common/NetworkMessages/PlayerLoggedInMessage';
import PlayerLoggedOutMessage from 'common/NetworkMessages/PlayerLoggedOutMessage';
import ActivePlayersRegistry from 'common/Registries/ActivePlayersRegistry';

import Store from '../../store';

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
    [BroadcastPlayersLatencyMessage, processBroadcastPlayersLatencyMessage],
    [GameStateMessage, processGameStateMessage],
    [PingMessage, processPingMessage],
    [PlayerLoggedInMessage, processPlayerLoggedInMessage],
    [PlayerLoggedOutMessage, processPlayerLoggedOutMessage],
  ]);

  this.systemInterface = new SystemInterface(this, {
    canProcess: message => messageProcessors.has(message.constructor),

    process: message => messageProcessors.get(message.constructor)(message),
  });

  /**
   * @param {AuthenticationResponseMessage} message
   */
  function processAuthenticationResponse(message) {
    const player = parameters.playerModel;
    player.clientId = message.getResponse();
    if (typeof message.getResponse() === 'number') {
      ActivePlayersRegistry.registerPlayer(player);
      Store.commit('players/addPlayer', player);
      player.authenticated = true;
      localStorage.setItem('displayName', player.displayName);
    }
  }

  /**
   * @param {BroadcastPlayersLatencyMessage} message
   */
  function processBroadcastPlayersLatencyMessage(message) {
    for (const [playerId, latency] of Object.entries(message.getPlayersLatency())) {
      ActivePlayersRegistry.getPlayerById(parseInt(playerId, 10)).latency = latency;
    }
  }

  /**
   * @param {GameStateMessage} message
   */
  function processGameStateMessage(message) {
    for (const player of message.getActivePlayers()) {
      ActivePlayersRegistry.registerPlayer(player);
      Store.commit('players/addPlayer', player);
    }
    for (const playerObject of message.getPlayerObjects()) {
      const spawnPlayerAction = new SpawnPlayerAction(playerObject, 0, -1);
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
  }

  /**
   * @param {PlayerLoggedInMessage} message
   */
  function processPlayerLoggedInMessage(message) {
    const player = message.getPlayer();
    player.authenticated = true;
    Store.commit('players/addPlayer', player);
    ActivePlayersRegistry.registerPlayer(player);
  }

  /**
   * @param {PlayerLoggedOutMessage} message
   */
  function processPlayerLoggedOutMessage(message) {
    // We actually remove the player on DespawnClientPlayersAction.
    const player = ActivePlayersRegistry.getPlayerById(message.getClientId());
    Store.commit('players/removePlayerWithId', player.clientId);
    player.online = false;
  }
}

export default ClientNetworkMessageSystem;

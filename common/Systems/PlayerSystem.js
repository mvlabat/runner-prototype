/**
 * @param {GameScene} gameScene
 * @constructor
 */
import SystemInterface from '../Interfaces/SystemInterface';
import SpawnPlayerAction from '../Actions/SpawnPlayerAction';
import DespawnPlayerAction from '../Actions/DespawnPlayerAction';
import { replaying } from '../Utils/SystemHelpers';
import DespawnClientPlayerAction from '../Actions/DespawnClientPlayerAction';
import ActivePlayersRegistry from '../Registries/ActivePlayersRegistry';
import EngineConfig from '../EngineConfig';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel
 * @constructor
 */
function PlayerSystem(gameScene, playerModel) {
  const actionProcessors = new Map([
    [SpawnPlayerAction, spawnPlayer],
    [DespawnPlayerAction, despawnPlayer],
    [DespawnClientPlayerAction, despawnClientPlayers],
  ]);

  this.systemInterface = new SystemInterface(this, {
    canProcess: action => actionProcessors.has(action.constructor),

    process: action => actionProcessors.get(action.constructor)(action),
  });

  /**
   * @param {SpawnPlayerAction} action
   */
  function spawnPlayer(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    if (EngineConfig.isServer() && !action.getClientId()) {
      action.setClientId(action.broadcastedActionInterface.getSenderId());
    }
    gameScene.addPlayer(action.getClientId(), action.getPlayer());
  }

  /**
   * @param {DespawnPlayerAction} action
   */
  function despawnPlayer(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    gameScene.removePlayer(action.getPlayerHashId());
  }

  /**
   * @param {DespawnClientPlayerAction} action
   */
  function despawnClientPlayers(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    const clientId = action.getClientId();
    gameScene.removePlayerByClientId(clientId);

    ActivePlayersRegistry.removePlayerWithId(clientId);
  }
}

export default PlayerSystem;

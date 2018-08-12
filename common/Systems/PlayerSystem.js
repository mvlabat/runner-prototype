/**
 * @param {GameScene} gameScene
 * @constructor
 */
import SystemInterface from '../Interfaces/SystemInterface';
import SpawnPlayerAction from '../Actions/SpawnPlayerAction';
import DespawnPlayerAction from '../Actions/DespawnPlayerAction';
import { replaying } from '../Utils/SystemHelpers';
import DespawnClientPlayersAction from '../Actions/DespawnClientPlayersAction';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel
 * @constructor
 */
function PlayerSystem(gameScene, playerModel) {
  const actionProcessors = new Map([
    [SpawnPlayerAction, spawnPlayer],
    [DespawnPlayerAction, despawnPlayer],
    [DespawnClientPlayersAction, despawnClientPlayers],
  ]);

  this.systemInterface = new SystemInterface(this, {
    canProcess: action => actionProcessors.has(action.constructor),

    process: action => actionProcessors.get(action.constructor)(action),
  });

  const playersByClientIds = new Map();

  /**
   * @param {SpawnPlayerAction} action
   */
  function spawnPlayer(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    playersByClientIds.set(action.broadcastedActionInterface.getSenderId(), action.getPlayer());
    gameScene.addPlayer(action.getPlayer());
  }

  /**
   * @param {DespawnPlayerAction} action
   */
  function despawnPlayer(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    playersByClientIds.delete(action.broadcastedActionInterface.getSenderId());
    gameScene.removePlayer(action.getPlayerHashId());
  }

  /**
   * @param {DespawnClientPlayersAction} action
   */
  function despawnClientPlayers(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    const player = playersByClientIds.get(action.getClientId());
    if (player) {
      playersByClientIds.delete(action.getClientId());
      gameScene.removePlayer(player.hashableIdInterface.getHashId());
    }
  }
}

export default PlayerSystem;

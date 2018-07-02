/**
 * @param {GameScene} gameScene
 * @constructor
 */
import SystemInterface from '../Interfaces/SystemInterface';
import SpawnPlayerAction from '../Actions/SpawnPlayerAction';
import DespawnPlayerAction from '../Actions/DespawnPlayerAction';
import { replaying } from '../Utils/SystemHelpers';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel
 * @constructor
 */
function PlayerSystem(gameScene, playerModel) {
  const actionProcessors = new Map([
    [SpawnPlayerAction, spawnPlayer],
    [DespawnPlayerAction, despawnPlayer],
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

    gameScene.addPlayer(action.getPlayer());
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
}

export default PlayerSystem;

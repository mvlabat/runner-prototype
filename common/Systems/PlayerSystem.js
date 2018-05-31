/**
 * @param {GameScene} gameScene
 * @constructor
 */
import ActionProcessorInterface from '../Interfaces/ActionProcessorInterface';
import SpawnPlayerAction from '../Actions/SpawnPlayerAction';
import DespawnPlayerAction from '../Actions/DespawnPlayerAction';

/**
 * @param {GameScene} gameScene
 * @constructor
 */
function PlayerSystem(gameScene) {
  const actionProcessors = new Map([
    [SpawnPlayerAction, spawnPlayer],
    [DespawnPlayerAction, despawnPlayer],
  ]);

  this.actionProcessorInterface = new ActionProcessorInterface(this, {
    canProcess: actionClass => actionProcessors.has(actionClass),

    processAction: action => actionProcessors.get(action.constructor)(action),
  });

  /**
   * @param {SpawnPlayerAction} action
   */
  function spawnPlayer(action) {
    gameScene.addPlayer(action.getPlayer());
  }

  /**
   * @param {DespawnPlayerAction} action
   */
  function despawnPlayer(action) {
    gameScene.removePlayer(action.getPlayerHashId());
  }
}

export default PlayerSystem;

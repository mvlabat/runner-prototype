import RustCommon from '../../rust_common/Cargo.toml';

import SystemInterface from '../Interfaces/SystemInterface';
import PlayerSetMovingAction from '../Actions/PlayerSetMovingAction';
import UpdatableInterface from '../Interfaces/UpdatableInterface';
import { replaying } from '../Utils/SystemHelpers';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel
 * @constructor
 */
function MovementSystem(gameScene, playerModel) {
  const actionProcessors = new Map([
    [PlayerSetMovingAction, playerSetMoving],
  ]);

  this.systemInterface = new SystemInterface(this, {
    canProcess: action => actionProcessors.has(action.constructor),

    process: action => actionProcessors.get(action.constructor)(action),
  });

  this.updatableInterface = new UpdatableInterface(this, {
    update: (timeDelta) => {
      const players = gameScene.getAllPlayers();
      const objects = gameScene.getAllBuildableObjects();
      RustCommon.processPlayersMovement(timeDelta, players, objects);
    },
  });

  /**
   * @param {PlayerSetMovingAction} action
   */
  function playerSetMoving(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    const player = gameScene.getPlayer(action.getPlayerHashId());
    if (player) {
      player.placeableObjectInterface.setPosition(action.getPosition());
      player.movementDirection = action.getDirection();
    }
  }
}

export default MovementSystem;

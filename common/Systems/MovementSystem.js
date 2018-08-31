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
      for (const player of gameScene.getAllPlayers()) {
        movePlayer(player, timeDelta);
      }
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
      player.setMovementDirection(action.getDirection());
    }
  }

  const PLAYER_SPEED = 50;

  /**
   * @param {Player} player
   * @param {number} timeDelta
   */
  function movePlayer(player, timeDelta) {
    const offsetVector = player
      .getMovementDirection()
      .clone()
      .multiplyScalar(PLAYER_SPEED * timeDelta);
    const newPosition = player.placeableObjectInterface.getPosition().add(offsetVector);
    player.placeableObjectInterface.setPosition(newPosition);
  }
}

export default MovementSystem;

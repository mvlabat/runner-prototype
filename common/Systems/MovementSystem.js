import ActionProcessorInterface from '../Interfaces/ActionProcessorInterface';
import PlayerSetMovingAction from '../Actions/PlayerSetMovingAction';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

/**
 * @param {GameScene} gameScene
 * @constructor
 */
function MovementSystem(gameScene) {
  const actionProcessors = new Map([
    [PlayerSetMovingAction, playerSetMoving],
  ]);

  this.actionProcessorInterface = new ActionProcessorInterface(this, {
    canProcess: actionClass => actionProcessors.has(actionClass),

    processAction: action => actionProcessors.get(action.constructor)(action),
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
    const player = gameScene.getPlayer(action.getPlayerHashId());
    player.setMovementDirection(action.getDirection());
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

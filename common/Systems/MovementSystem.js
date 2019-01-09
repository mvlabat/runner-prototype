import RustCommon from '../../rust_common/Cargo.toml';

import SystemInterface from '../Interfaces/SystemInterface';
import PlayerSetMovingAction from '../Actions/PlayerSetMovingAction';
import UpdatableInterface from '../Interfaces/UpdatableInterface';
import { replaying } from '../Utils/SystemHelpers';
import EngineConfig from '../EngineConfig';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel
 * @param {BroadcastedActionsQueue} broadcastedActionsQueue
 * @constructor
 */
function MovementSystem(gameScene, playerModel, broadcastedActionsQueue) {
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
      let playedAction = action;
      if (EngineConfig.isServer()) {
        playedAction = new PlayerSetMovingAction(
          action.getPlayerHashId(),
          player.placeableObjectInterface.getPosition(),
          action.getDirection(),
          action.actionInterface.timeOccurred,
          action.actionInterface.senderId,
        );
      }
      broadcastedActionsQueue.addAction(playedAction);

      player.placeableObjectInterface.setPosition(playedAction.getPosition());
      player.movementDirection = playedAction.getDirection();
    }
  }
}

export default MovementSystem;

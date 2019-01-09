import UpdatableInterface from '../Interfaces/UpdatableInterface';
import EngineConfig from '../EngineConfig';
import { GAMEPLAY_UPDATE_INTERVAL_SECS } from '../Constants';

/**
 * @param {GameScene} gameScene
 * @param {BuildableObjectSystem} buildableObjectSystem
 * @param {MovementSystem} movementSystem
 * @param {PlayerSystem} playerSystem
 * @param {BroadcastedActionsQueue} broadcastedActionsQueue
 *
 * @constructor
 */
function ActionController(
  gameScene,
  buildableObjectSystem,
  movementSystem,
  playerSystem,
  broadcastedActionsQueue,
) {
  let actionCounter = 0;
  const actionsQueue = [];
  let networkController = null;

  const systems = {
    buildableObjectSystem,
    movementSystem,
    playerSystem,
  };

  // INTERFACES IMPLEMENTATION.
  this.updatableInterface = new UpdatableInterface(this, {
    update: (timeDelta) => {
      const actions = drainActions();
      for (const action of actions) {
        for (const systemKey of Object.keys(systems)) {
          const system = systems[systemKey];
          if (system.systemInterface.canProcess(action)) {
            system.systemInterface.process(action);
          }
        }
      }

      systems.movementSystem.updatableInterface.update(timeDelta);

      for (const action of actions) {
        const isNotBroadcastedYet = action.actionInterface.isBroadcastedAfterExecution()
          && !action.actionInterface.isAlteredDuringExecution();
        if (isNotBroadcastedYet) {
          broadcastedActionsQueue.addAction(action);
        }
      }

      if (EngineConfig.isClient()) {
        for (const action of broadcastedActionsQueue.getActions()) {
          networkController.networkControllerInterface.broadcastAction(action);
        }
        broadcastedActionsQueue.clearActions();
      }
    },
  });

  // CLASS IMPLEMENTATION.
  this.setNetworkController = (newNetworkController) => {
    networkController = newNetworkController;
  };

  this.addAction = (action) => {
    if (action.actionInterface.timeOccurred === null) {
      action.actionInterface.timeOccurred = gameScene.playedTime;
    } else if (EngineConfig.isServer()) {
      console.log(`${gameScene.playedTime}:${action.actionInterface.timeOccurred}:${gameScene.previousServerTime}`);
      const timeCompensation = action.actionInterface.timeOccurred < gameScene.previousServerTime
        ? 0
        : action.actionInterface.timeOccurred - gameScene.previousServerTime;
      // console.log(timeCompensation);
      action.actionInterface.timeOccurred = gameScene.serverTime + timeCompensation;
    }
    action.actionInterface.id = actionCounter;
    actionCounter += 1;

    actionsQueue.push(action);

    if (!action.actionInterface.isBroadcastedAfterExecution()) {
      networkController.networkControllerInterface.broadcastAction(action);
    } else if (!action.actionInterface.isAlteredDuringExecution()) {
      broadcastedActionsQueue.addAction(action);
    }
  };

  function drainActions() {
    actionsQueue.sort(actionCompare);
    const actionsCount = actionsQueue.findIndex((action) => {
      const nextTickTime = gameScene.playedTime + GAMEPLAY_UPDATE_INTERVAL_SECS;
      return action.actionInterface.timeOccurred > nextTickTime;
    });
    return actionsQueue.splice(0, actionsCount === -1 ? actionsQueue.length : actionsCount);
  }
}

function actionCompare(actionA, actionB) {
  const timeOccurredA = actionA.actionInterface.timeOccurred;
  const timeOccurredB = actionB.actionInterface.timeOccurred;
  const timeD = timeOccurredA - timeOccurredB;
  if (timeD !== 0) {
    return timeD;
  }

  const idA = actionA.actionInterface.id;
  const idB = actionB.actionInterface.id;
  const d = idA - idB;
  if (d !== 0) {
    return d;
  }

  return 0;
}

export default ActionController;

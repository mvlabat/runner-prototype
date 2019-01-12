import UpdatableInterface from '../Interfaces/UpdatableInterface';
import EngineConfig from '../EngineConfig';

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
    update: () => {
      const actions = drainActions();
      for (const action of actions) {
        for (const systemKey of Object.keys(systems)) {
          const system = systems[systemKey];
          if (system.systemInterface.canProcess(action)) {
            system.systemInterface.process(action);
          }
        }
      }

      systems.movementSystem.updatableInterface.update();

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
    if (action.actionInterface.tickOccurred === null) {
      action.actionInterface.tickOccurred = gameScene.currentTick;
    } else if (EngineConfig.isServer()) {
      const timeCompensation = action.actionInterface.tickOccurred < gameScene.previousServerTick
        ? 0
        : action.actionInterface.tickOccurred - gameScene.previousServerTick;
      action.actionInterface.tickOccurred = gameScene.serverTick + timeCompensation;
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
      const nextTick = gameScene.currentTick + 1;
      return action.actionInterface.tickOccurred > nextTick;
    });
    return actionsQueue.splice(0, actionsCount === -1 ? actionsQueue.length : actionsCount);
  }
}

function actionCompare(actionA, actionB) {
  const tickOccurredA = actionA.actionInterface.tickOccurred;
  const tickOccurredB = actionB.actionInterface.tickOccurred;
  const tickD = tickOccurredA - tickOccurredB;
  if (tickD !== 0) {
    return tickD;
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

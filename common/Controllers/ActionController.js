import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import BuildableObjectSystem from '../Systems/BuildableObjectSystem';
import MovementSystem from '../Systems/MovementSystem';
import PlayerSystem from '../Systems/PlayerSystem';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel - Is supposed to have null clientId on server.
 *
 * @constructor
 */
function ActionController(gameScene, playerModel) {
  const actionsQueue = [];
  const broadcastedActionsQueue = [];
  let networkController = null;

  const systems = {
    buildableObjectSystem: new BuildableObjectSystem(gameScene, playerModel),
    movementSystem: new MovementSystem(gameScene, playerModel),
    playerSystem: new PlayerSystem(gameScene, playerModel),
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

      const broadcastedActions = drainBroadcastedActionsQueue();
      for (const action of broadcastedActions) {
        networkController.networkControllerInterface.broadcastAction(action);
      }
    },
  });

  // CLASS IMPLEMENTATION.
  this.setNetworkController = (newNetworkController) => {
    networkController = newNetworkController;
  };

  this.addAction = (action) => {
    action.actionInterface.setTimeOccurred(0); // TODO: set actual game time.
    actionsQueue.push(action);
    if (BroadcastedActionInterface.has(action)) {
      if (!action.broadcastedActionInterface.isBroadcastedAfterExecution()) {
        networkController.networkControllerInterface.broadcastAction(action);
      } else {
        broadcastedActionsQueue.push(action);
      }
    }
  };

  function drainActions() {
    return actionsQueue.splice(0, actionsQueue.length);
  }

  function drainBroadcastedActionsQueue() {
    return broadcastedActionsQueue.splice(0, broadcastedActionsQueue.length);
  }
}

export default ActionController;

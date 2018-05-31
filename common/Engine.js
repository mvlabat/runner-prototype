import ActionController from './Controllers/ActionController';
import BuildableObjectSystem from './Systems/BuildableObjectSystem';
import GameScene from './Models/GameScene';
import MovementSystem from './Systems/MovementSystem';
import PlayerSystem from './Systems/PlayerSystem';
import GameState from './Models/GameState';
import { log } from './Utils/Debug';

function Engine(isServer) {
  Engine.config = new EngineConfig(isServer);
  log('Debug mode is enabled');

  const actionController = new ActionController();
  const gameScene = new GameScene();
  const gameState = new GameState(gameScene);

  const systems = {
    buildableObjectSystem: new BuildableObjectSystem(gameScene),
    movementSystem: new MovementSystem(gameScene),
    playerSystem: new PlayerSystem(gameScene),
  };

  this.getActionController = () => actionController;

  this.getGameState = () => gameState;

  this.tick = (timeDelta) => {
    const actions = actionController.drainActions();
    for (const action of actions) {
      for (const systemKey of Object.keys(systems)) {
        const system = systems[systemKey];
        if (system.actionProcessorInterface.canProcess(action.constructor)) {
          system.actionProcessorInterface.processAction(action);
        }
      }
    }

    systems.movementSystem.updatableInterface.update(timeDelta);
  };
}

function EngineConfig(isServer) {
  const debugIsEnabled = boolean(process.env.DEBUG_ENABLED) || boolean(process.env.FORCE_DEBUG);

  this.debugIsEnabled = () => debugIsEnabled;

  this.isServer = () => isServer;

  this.isClient = () => !isServer;

  function boolean(string) {
    return string === 'true';
  }
}

export default Engine;

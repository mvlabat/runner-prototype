import ActionController from './Controllers/ActionController';
import GameScene from './Models/GameScene';
import GameState from './Models/GameState';
import { log } from './Utils/Debug';
import PlayerModel from './Models/PlayerModel';

function Engine(isServer) {
  Engine.config = new EngineConfig(isServer);
  log('Debug mode is enabled');

  const gameScene = new GameScene();
  const playerModel = new PlayerModel();
  const actionController = new ActionController(gameScene, playerModel);
  const gameState = new GameState(gameScene);

  /**
   * @return ActionController
   */
  this.getActionController = () => actionController;

  /**
   * @return GameState
   */
  this.getGameState = () => gameState;

  /**
   * @return PlayerModel
   */
  this.getPlayerModel = () => playerModel;

  this.tick = (timeDelta) => {
    actionController.updatableInterface.update(timeDelta);
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

import ActionController from './Controllers/ActionController';
import GameScene from './Models/GameScene';
import GameState from './Models/GameState';
import { log } from './Utils/Debug';
import PlayerModel from './Models/PlayerModel';
import EngineConfig from './EngineConfig';

function Engine(isServer) {
  EngineConfig.initialize(isServer);
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

export default Engine;

import CommonMuddle from './Muddle';

import { log } from './Utils/Debug';
import EngineConfig from './EngineConfig';
import GlobalPsonDictionary from './Utils/GlobalPsonDictionary';

import ActionController from './Controllers/ActionController';
import GameScene from './Models/GameScene';

/**
 * @param {boolean} isServer
 * @constructor
 */
function Engine(isServer) {
  EngineConfig.initialize(isServer);
  log('Debug mode is enabled');
  GlobalPsonDictionary.commitDictionary();
  log(`Committed ${GlobalPsonDictionary.getDictionaryLength()} words to GlobalPsonDictionary`);

  /**
   * @type ActionController
   */
  const actionController = CommonMuddle[ActionController];

  /**
   * @type GameScene
   */
  const gameScene = CommonMuddle[GameScene];

  this.tick = () => {
    if (EngineConfig.isClient() && gameScene.currentTick >= gameScene.serverTick) {
      return false;
    }
    actionController.updatableInterface.update();
    gameScene.currentTick += 1;
    return true;
  };
}

export default Engine;

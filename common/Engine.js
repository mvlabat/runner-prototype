import CommonMuddle from './Muddle';

import { log } from './Utils/Debug';
import EngineConfig from './EngineConfig';
import GlobalPsonDictionary from './Utils/GlobalPsonDictionary';

import ActionController from './Controllers/ActionController';

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

  this.tick = (timeDelta) => {
    actionController.updatableInterface.update(timeDelta);
  };
}

export default Engine;

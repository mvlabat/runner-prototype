import CommonMuddle from './Muddle';

import { log } from './Utils/Debug';
import EngineConfig from './EngineConfig';
import PsonDictionary from './Utils/PsonDictionary';

import ActionController from './Controllers/ActionController';

function Engine(isServer) {
  EngineConfig.initialize(isServer);
  log('Debug mode is enabled');
  PsonDictionary.commitDictionary();

  /**
   * @type ActionController
   */
  const actionController = CommonMuddle[ActionController];

  this.tick = (timeDelta) => {
    actionController.updatableInterface.update(timeDelta);
  };
}

export default Engine;

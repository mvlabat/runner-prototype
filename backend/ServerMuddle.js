import { initializeMuddle } from 'common/Muddle';

import ActionController from 'common/Controllers/ActionController';
import GameState from 'common/Models/GameState';

import ServerNetworkController from './Controllers/ServerNetworkController';

/**
 * @constructor
 */
const ServerMuddle = initializeMuddle((common, pourService) => {
  // Controllers.
  pourService(ServerNetworkController, common[ActionController], common[GameState]);
});

/**
 * @type ActionController
 */
const actionController = ServerMuddle.common[ActionController];
actionController.setNetworkController(ServerMuddle[ServerNetworkController]);

export default ServerMuddle;

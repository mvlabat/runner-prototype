import { initializeMuddle } from 'common/Muddle';

import ActionController from 'common/Controllers/ActionController';
import GameScene from 'common/Models/GameScene';
import BroadcastedActionsQueue from 'common/Models/BroadcastedActionsQueue';

import ServerNetworkController from './Controllers/ServerNetworkController';

/**
 * @constructor
 */
const ServerMuddle = initializeMuddle((common, pourService) => {
  // Controllers.
  pourService(
    ServerNetworkController,
    common[ActionController],
    common[GameScene],
    common[BroadcastedActionsQueue],
  );
});

/**
 * @type ActionController
 */
const actionController = ServerMuddle.common[ActionController];
actionController.setNetworkController(ServerMuddle[ServerNetworkController]);

export default ServerMuddle;

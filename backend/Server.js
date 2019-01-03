// eslint-disable-next-line import/no-extraneous-dependencies
import Engine from 'common';
import ServerMuddle from './ServerMuddle';
import ServerNetworkController from './Controllers/ServerNetworkController';

function Server() {
  process.env.FORCE_DEBUG = true;

  const engine = new Engine(true);

  /**
   * @type ServerNetworkController
   */
  const networkController = ServerMuddle[ServerNetworkController];

  // Gameloop.

  const GAMEPLAY_UPDATE_INTERVAL = 1000 / 60;
  const NETWORK_UPDATE_INTERVAL = 50;

  let lastGameplayUpdate = 0;
  let lastNetworkUpdate = 0;

  function tick() {
    const now = new Date();

    const gameplayTimeDelta = now - lastGameplayUpdate;
    const networkTimeDelta = now - lastNetworkUpdate;

    if (gameplayTimeDelta >= GAMEPLAY_UPDATE_INTERVAL) {
      lastGameplayUpdate = now;
      engine.tick(GAMEPLAY_UPDATE_INTERVAL / 1000);
    }
    if (networkTimeDelta >= NETWORK_UPDATE_INTERVAL) {
      lastNetworkUpdate = now;
      const networkTimeDeltaSecs = networkTimeDelta / 1000;
      networkController.updatableInterface.update(networkTimeDeltaSecs);
    }

    const gameplayTimeDeltaAfter = now - lastGameplayUpdate;
    const networkTimeDeltaAfter = now - lastNetworkUpdate;

    const closestTickInterval = Math.min(
      GAMEPLAY_UPDATE_INTERVAL - gameplayTimeDeltaAfter,
      NETWORK_UPDATE_INTERVAL - networkTimeDeltaAfter,
    ) - 1;
    if (closestTickInterval > 1) {
      setTimeout(tick, closestTickInterval);
    } else {
      setImmediate(tick, closestTickInterval);
    }
  }

  tick();
}

export default Server;

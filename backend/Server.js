// eslint-disable-next-line import/no-extraneous-dependencies
import Engine from 'common';
import {
  GAMEPLAY_UPDATE_INTERVAL,
  NETWORK_UPDATE_INTERVAL,
  GAMEPLAY_UPDATE_INTERVAL_SECS,
} from 'common/Constants';
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
  const initNow = new Date();
  let lastGameplayUpdate = initNow - NETWORK_UPDATE_INTERVAL;
  let lastNetworkUpdate = initNow;

  let firstInit = true;

  function tick(initTime = null) {
    const now = firstInit ? initTime : new Date();
    firstInit = false;

    const networkTimeDelta = now - lastNetworkUpdate;

    if (networkTimeDelta >= NETWORK_UPDATE_INTERVAL) {
      while (lastGameplayUpdate < now - GAMEPLAY_UPDATE_INTERVAL) {
        lastGameplayUpdate += GAMEPLAY_UPDATE_INTERVAL;
        engine.tick(GAMEPLAY_UPDATE_INTERVAL_SECS);
      }

      lastNetworkUpdate = now;
      networkController.updatableInterface.update();
    }

    const networkTimeDeltaAfter = now - lastNetworkUpdate;

    const closestTickInterval = NETWORK_UPDATE_INTERVAL - networkTimeDeltaAfter - 1;
    if (closestTickInterval > 1000) {
      console.log('Network anomaly:');
      console.log(now);
      console.log(lastNetworkUpdate);
      console.log(networkTimeDeltaAfter);
      console.log(closestTickInterval);
    }
    if (closestTickInterval > 1) {
      setTimeout(tick, closestTickInterval);
    } else {
      setImmediate(tick, closestTickInterval);
    }
  }

  tick(initNow);
}

export default Server;

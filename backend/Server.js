import Engine from 'common';
import NetworkController from './Controllers/NetworkController';

function Server() {
  process.env.FORCE_DEBUG = true;

  const engine = new Engine(true);
  const actionController = engine.getActionController();
  const gameState = engine.getGameState();
  const networkController = new NetworkController(actionController, gameState);
  actionController.setNetworkController(networkController);

  // Gameloop.

  // TODO: maybe there's more clever way to tick without setImmediate performance impact.
  const TICK_INTERVAL = 5;
  const GAMEPLAY_UPDATE_INTERVAL = 15;
  const NETWORK_UPDATE_INTERVAL = 45;

  let lastGameplayUpdate = 0;
  let lastNetworkUpdate = 0;
  let crashed = false;

  function tick() {
    if (crashed) return;
    setTimeout(tick, TICK_INTERVAL);
    const now = new Date();

    const gameplayTimeDelta = now - lastGameplayUpdate;
    const networkTimeDelta = now - lastNetworkUpdate;

    try {
      const gameplayTimeDeltaSecs = gameplayTimeDelta / 1000;
      const networkTimeDeltaSecs = networkTimeDelta / 1000;
      if (gameplayTimeDelta >= GAMEPLAY_UPDATE_INTERVAL) {
        lastGameplayUpdate = now;
        engine.tick(gameplayTimeDeltaSecs);
      }
      if (networkTimeDelta >= NETWORK_UPDATE_INTERVAL) {
        lastNetworkUpdate = now;
        networkController.updatableInterface.update(networkTimeDeltaSecs);
      }
    } catch (error) {
      crashed = true;
      throw error;
    }
  }

  tick();
}

export default Server;

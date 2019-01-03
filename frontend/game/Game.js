import * as THREE from 'three';

// eslint-disable-next-line import/no-extraneous-dependencies
import Engine from 'common';
import EngineConfig from 'common/EngineConfig';
import ActionController from 'common/Controllers/ActionController';

import Renderer from './Renderer';
import Sandbox from './Sandbox';
import CanvasWrapper from './Models/CanvasWrapper';
import MainUiController from './Controllers/MainUiController';
import ClientNetworkController from './Controllers/ClientNetworkController';
import ClientMuddle from '../ClientMuddle';

function Game() {
  const engine = new Engine(false);

  Sandbox(ClientMuddle.common[ActionController]);

  const renderer = createRenderer();

  /**
   * @type MainUiController
   */
  const mainUiController = ClientMuddle[MainUiController];

  /**
   * @type ClientNetworkController
   */
  const networkController = ClientMuddle[ClientNetworkController];

  if (EngineConfig.debugIsEnabled()) {
    window.THREE = THREE;
  }

  // Gameloop.

  const GAMEPLAY_UPDATE_INTERVAL = 1000 / 60;
  const NETWORK_UPDATE_INTERVAL = 50;

  let lastGameplayUpdate = 0;
  let lastNetworkUpdate = 0;

  function tick(now) {
    const gameplayTimeDelta = now - lastGameplayUpdate;
    const networkTimeDelta = now - lastNetworkUpdate;

    if (gameplayTimeDelta >= GAMEPLAY_UPDATE_INTERVAL) {
      lastGameplayUpdate = now;
      engine.tick(GAMEPLAY_UPDATE_INTERVAL / 1000);
      mainUiController.updatableInterface.update(GAMEPLAY_UPDATE_INTERVAL);
      renderer.render();
    }
    if (networkTimeDelta >= NETWORK_UPDATE_INTERVAL) {
      lastNetworkUpdate = now;
      const networkTimeDeltaSecs = networkTimeDelta / 1000;
      networkController.updatableInterface.update(networkTimeDeltaSecs);
    }

    requestAnimationFrame(tick);
  }

  this.startGameLoop = () => {
    tick(0);
  };
}

function createRenderer() {
  /**
   * @type CanvasWrapper
   */
  const canvasWrapper = ClientMuddle[CanvasWrapper];

  const renderer = new THREE.WebGLRenderer();
  canvasWrapper.initialize(renderer.domElement);

  document.getElementById('canvas-wrapper').appendChild(renderer.domElement);

  return new Renderer(renderer);
}

export default Game;

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

  const GAMEPLAY_UPDATE_INTERVAL = 15;
  const NETWORK_UPDATE_INTERVAL = 45;
  const RENDER_UPDATE_INTERVAL = 1000 / 60;

  let lastGameplayUpdate = 0;
  let lastNetworkUpdate = 0;
  let lastRenderUpdate = 0;
  let crashed = false;

  function tick(now) {
    if (crashed) return;
    requestAnimationFrame(tick);

    const gameplayTimeDelta = now - lastGameplayUpdate;
    const renderTimeDelta = now - lastRenderUpdate;
    const networkTimeDelta = now - lastNetworkUpdate;

    try {
      const gameplayTimeDeltaSecs = gameplayTimeDelta / 1000;
      if (gameplayTimeDelta >= GAMEPLAY_UPDATE_INTERVAL) {
        lastGameplayUpdate = now;
        engine.tick(gameplayTimeDeltaSecs);
        mainUiController.updatableInterface.update(gameplayTimeDeltaSecs);
      }
      if (networkTimeDelta >= NETWORK_UPDATE_INTERVAL) {
        lastNetworkUpdate = now;
        networkController.updatableInterface.update(gameplayTimeDeltaSecs);
      }
      if (renderTimeDelta >= RENDER_UPDATE_INTERVAL) {
        lastRenderUpdate = now;
        renderer.render();
      }
    } catch (error) {
      crashed = true;
      throw error;
    }
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

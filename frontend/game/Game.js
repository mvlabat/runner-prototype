import * as THREE from 'three';

// eslint-disable-next-line import/no-extraneous-dependencies
import Engine from 'common';
import EngineConfig from 'common/EngineConfig';
import ActionController from 'common/Controllers/ActionController';
import GameState from 'common/Models/GameState';
import {
  GAMEPLAY_UPDATE_INTERVAL,
  NETWORK_UPDATE_INTERVAL,
  GAMEPLAY_UPDATE_INTERVAL_SECS,
} from 'common/Constants';

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

  /**
   * @type GameState
   */
  const gameState = ClientMuddle.common[GameState];

  if (EngineConfig.debugIsEnabled()) {
    window.THREE = THREE;
  }

  // Gameloop.
  let lastGameplayUpdate = 0;
  let lastNetworkUpdate = 0;

  function tick(now) {
    const gameplayTimeDelta = now - lastGameplayUpdate;
    const networkTimeDelta = now - lastNetworkUpdate;

    const timeBeforeNetworkUpdate = gameState.getServerTime() - GAMEPLAY_UPDATE_INTERVAL_SECS;
    const clientLagsBehind = gameState.getPlayedTime() < timeBeforeNetworkUpdate;

    if (gameplayTimeDelta >= GAMEPLAY_UPDATE_INTERVAL || clientLagsBehind) {
      const waitingForNetwork = !engine.tick(GAMEPLAY_UPDATE_INTERVAL_SECS);
      if (!waitingForNetwork) {
        lastGameplayUpdate = now;
        mainUiController.updatableInterface.update(GAMEPLAY_UPDATE_INTERVAL);
      }
      // TODO: skip frames if lagging to much.
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

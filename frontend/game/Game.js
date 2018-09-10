import * as THREE from 'three';

// eslint-disable-next-line import/no-extraneous-dependencies
import Engine from 'common';
import EngineConfig from 'common/EngineConfig';

import Renderer from './Renderer';
import Sandbox from './Sandbox';
import CanvasWrapper from './Models/CanvasWrapper';
import CameraWrapper from './Models/CameraWrapper';
import MainUiController from './Controllers/MainUiController';
import ClientNetworkController from './Controllers/ClientNetworkController';
import LocalGameState from './LocalGameState';

function Game() {
  const engine = new Engine(false);
  const actionController = engine.getActionController();

  const gameState = engine.getGameState();
  const playerModel = engine.getPlayerModel();

  Sandbox(actionController);

  const { renderer, canvasWrapper, cameraWrapper } = initializeRenderer(gameState);

  const mainUiController = new MainUiController(actionController, cameraWrapper, canvasWrapper);

  const networkController = new ClientNetworkController(actionController, playerModel);
  actionController.setNetworkController(networkController);

  LocalGameState.initialize(
    gameState,
    playerModel,
    networkController,
    actionController,
    mainUiController.getBuilderController(),
    mainUiController.getPlayerController(),
  );

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

function initializeRenderer(gameState) {
  const renderer = new THREE.WebGLRenderer();
  const cameraWrapper = new CameraWrapper();
  const canvasWrapper = new CanvasWrapper(renderer.domElement);

  document.getElementById('canvas-wrapper').appendChild(renderer.domElement);

  return {
    renderer: new Renderer(renderer, gameState, canvasWrapper, cameraWrapper),
    canvasWrapper,
    cameraWrapper,
  };
}

export default Game;

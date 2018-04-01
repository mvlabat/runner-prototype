import * as THREE from 'three';

import Renderer from './Renderer';
import Scene from './Models/Scene';
import SceneBuildableObjectManager from './SceneBuildableObjectManager';
import Sandbox from './Sandbox';
import BuilderController from './Controllers/BuilderController';
import CanvasWrapper from './Models/CanvasWrapper';
import CameraWrapper from './Models/CameraWrapper';
import CameraController from './Controllers/CameraController';
import MainUiController from './Controllers/MainUiController';
import NetworkController from './Controllers/NetworkController';

export default function Game() {
  const scene = new Scene();
  const sceneObjectManager = new SceneBuildableObjectManager(scene);

  Sandbox(sceneObjectManager);

  const { renderer, canvasWrapper, cameraWrapper } = initializeRenderer(sceneObjectManager);

  const networkController = new NetworkController();
  const cameraController = new CameraController(cameraWrapper, canvasWrapper);
  const builderController = new BuilderController(canvasWrapper, cameraWrapper, sceneObjectManager);
  MainUiController(canvasWrapper, builderController);

  if (Game.config.debugIsEnabled()) {
    console.log('Debug mode is enabled.');
    window.THREE = THREE;
    window.sceneObjectmanager = sceneObjectManager;
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
      if (gameplayTimeDelta >= GAMEPLAY_UPDATE_INTERVAL) {
        lastGameplayUpdate = now;
        cameraController.updateCamera(gameplayTimeDelta / 1000);
      }
      if (networkTimeDelta >= NETWORK_UPDATE_INTERVAL) {
        lastNetworkUpdate = now;
        networkController.update();
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

  tick(0);
}

function GameConfig() {
  const debugIsEnabled = boolean(process.env.DEBUG_ENABLED) || boolean(process.env.FORCE_DEBUG);

  this.debugIsEnabled = () => debugIsEnabled;

  function boolean(string) {
    return string === 'true';
  }
}

Game.config = new GameConfig();

function initializeRenderer(sceneObjectManager) {
  const renderer = new THREE.WebGLRenderer();
  const cameraWrapper = new CameraWrapper();
  const canvasWrapper = new CanvasWrapper(renderer.domElement);

  document.getElementById('canvas-wrapper').appendChild(renderer.domElement);

  return {
    renderer: new Renderer(renderer, sceneObjectManager, canvasWrapper, cameraWrapper),
    canvasWrapper,
    cameraWrapper,
  };
}

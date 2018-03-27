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

export default function Game() {
  const scene = new Scene();
  const sceneObjectManager = new SceneBuildableObjectManager(scene);

  Sandbox(sceneObjectManager);

  const { renderer, canvasWrapper, cameraWrapper } = initializeRenderer(sceneObjectManager);

  const cameraController = new CameraController(cameraWrapper, canvasWrapper);
  const builderController = new BuilderController(canvasWrapper, cameraWrapper, sceneObjectManager);
  MainUiController(canvasWrapper, builderController);

  if (Game.config.debugIsEnabled()) {
    console.log('Debug mode is enabled.');
    window.THREE = THREE;
    window.sceneObjectmanager = sceneObjectManager;
  }

  let crashed = false;
  function animationTick() {
    if (crashed) return;
    try {
      requestAnimationFrame(animationTick);
      cameraController.updateCameraSize();
      renderer.render();
    } catch (error) {
      crashed = true;
      throw error;
    }
  }

  animationTick();
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

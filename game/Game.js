import * as THREE from 'three';

import Renderer from './Renderer';
import Scene from './Scene';
import SceneBuildableObjectManager from './SceneBuildableObjectManager';
import Sandbox from './Sandbox';
import BuilderController from './BuilderController';

export default function Game() {
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const scene = new Scene(THREE.Vector2(canvasWrapper.clientWidth, canvasWrapper.clientHeight));
  const sceneObjectManager = new SceneBuildableObjectManager(scene);

  Sandbox(sceneObjectManager);
  const renderer = new Renderer(sceneObjectManager);
  BuilderController(renderer.getCanvas(), renderer.getCamera(), sceneObjectManager);

  renderer.startRendering();
}

function GameConfig() {
  const debugIsEnabled = boolean(process.env.DEBUG_ENABLED) || boolean(process.env.FORCE_DEBUG);

  this.debugIsEnabled = () => debugIsEnabled;

  function boolean(string) {
    return string === 'true';
  }
}

Game.config = new GameConfig();

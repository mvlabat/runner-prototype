import * as THREE from 'three';

import Renderer from './Renderer';
import Scene from './Scene';
import SceneBuildableObjectManager from './SceneBuildableObjectManager';
import Sandbox from './Sandbox';
import BuilderController from './BuilderController';

export default function () {
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const scene = new Scene(THREE.Vector2(canvasWrapper.clientWidth, canvasWrapper.clientHeight));
  const sceneObjectManager = new SceneBuildableObjectManager(scene);

  Sandbox(sceneObjectManager);
  const renderer = new Renderer(sceneObjectManager);
  BuilderController(renderer.getCanvas(), renderer.getCamera(), sceneObjectManager);

  renderer.startRendering();
}

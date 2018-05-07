/* eslint-disable */
import * as THREE from 'three';

import Rectangle from './BuildableObjects/Rectangle';

/**
 * @param {GameScene} gameScene
 * @constructor
 */
function Sandbox(gameScene) {
  console.log('Sandbox is activated. We can do here whatever we want!');

  // gameScene.addBuildableObject(new Rectangle(
  //   new THREE.Vector2(0, 0),
  //   new THREE.Vector2(10, 20),
  //   new THREE.Color(0x0000FF),
  // ));
  //
  // gameScene.addBuildableObject(new Rectangle(
  //   new THREE.Vector2(50, 50),
  //   new THREE.Vector2(100, 20),
  //   new THREE.Color(0x0000FF),
  // ));
  //
  // setTimeout(() => {
  //   gameScene.addBuildableObject(new Rectangle(
  //     new THREE.Vector2(100, 100),
  //     new THREE.Vector2(100, 20),
  //     new THREE.Color(0x0000FF),
  //   ));
  // }, 3000);
}

export default Sandbox;

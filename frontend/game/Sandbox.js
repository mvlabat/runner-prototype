/* eslint-disable */
import * as THREE from 'three';
import SaveBuildableObjectAction from 'common/Actions/SaveBuildableObjectAction';
import Rectangle from 'common/PlaceableObjects/Rectangle';
import Circle from 'common/PlaceableObjects/Circle';
import { log } from 'common/Utils/Debug';

/**
 * @param {ActionController} actionController
 * @constructor
 */
function Sandbox(actionController) {
  log('Sandbox is activated. We can do here whatever we want!');

  // actionController.addAction(new SaveBuildableObjectAction(new Rectangle(
  //   new THREE.Vector2(0, 0),
  //   new THREE.Vector2(10, 20),
  //   new THREE.Color(0x0000FF),
  //   false,
  // )));
  //
  // actionController.addAction(new SaveBuildableObjectAction(new Rectangle(
  //   new THREE.Vector2(50, 50),
  //   new THREE.Vector2(100, 20),
  //   new THREE.Color(0x00FF00),
  //   false,
  // )));
  //
  // setTimeout(() => {
  //   actionController.addAction(new SaveBuildableObjectAction(new Circle(
  //     new THREE.Vector2(-20, -20),
  //     15,
  //     new THREE.Color(0xFF0000),
  //     false,
  //   )));
  // }, 3000);
}

export default Sandbox;

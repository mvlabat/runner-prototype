import * as THREE from 'three';

import Rectangle from '../BuildableObjects/Rectangle';
import Circle from '../BuildableObjects/Circle';
import UpdatableInterface from '../Interfaces/UpdatableInterface';
import { log } from '../Utils/Debug';

/**
 * @param {CanvasWrapper} canvasWrapper
 * @param {CameraWrapper} cameraWrapper
 * @param {GameScene} gameScene
 * @constructor
 */
function BuilderController(canvasWrapper, cameraWrapper, gameScene) {
  let activated = false;
  let placedObject = null;

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {
      if (!activated) {
        return;
      }

      movePlacedObject(canvasWrapper.getMouseWorldPosition());
    },
  });

  this.activateBuilderMode = () => {
    log('Builder mode activated.');
    activated = true;
  };

  this.deactivateBuilderMode = () => {
    activated = false;
    gameScene.removeBuildableObject(placedObject.hashableIdInterface.getHashId());
    placedObject = null;
  };

  this.placeObject = () => {
    // We create a new object on update.
    placedObject = null;
  };

  function movePlacedObject(position) {
    if (placedObject === null) {
      if (Math.random() >= 0.5) {
        placedObject = new Rectangle(
          position,
          new THREE.Vector2(3, 3),
          new THREE.Color(Math.random() * 0xffffff),
        );
      } else {
        placedObject = new Circle(
          position,
          1.5,
          new THREE.Color(Math.random() * 0xffffff),
        );
      }

      gameScene.addBuildableObject(placedObject);
    }
    placedObject.placeableObjectInterface.setPosition(position);
  }
}

export default BuilderController;

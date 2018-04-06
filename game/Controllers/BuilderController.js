import * as THREE from 'three';

import Rectangle from '../BuildableObjects/Rectangle';
import Circle from '../BuildableObjects/Circle';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

/**
 * @param {CanvasWrapper} canvasWrapper
 * @param {CameraWrapper} cameraWrapper
 * @param {SceneObjectManager} sceneObjectManager
 * @constructor
 */
function BuilderController(canvasWrapper, cameraWrapper, sceneObjectManager) {
  let placedObject = null;

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {
      movePlacedObject(canvasWrapper.getMouseWorldPosition());
    },
  });

  this.getPlacedObject = () => placedObject;

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

      sceneObjectManager.addObject(placedObject);
    }
    placedObject.placableObjectInterface.setPosition(position);
  }
}

export default BuilderController;

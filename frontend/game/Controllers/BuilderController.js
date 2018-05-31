import * as THREE from 'three';
import UpdatableInterface from 'platformio-common/Interfaces/UpdatableInterface';

import SaveBuildableObjectAction from 'platformio-common/Actions/SaveBuildableObjectAction';
import RemoveBuildableObjectAction from 'platformio-common/Actions/RemoveBuildableObjectAction';
import Rectangle from 'platformio-common/PlaceableObjects/Rectangle';
import Circle from 'platformio-common/PlaceableObjects/Circle';
import { log } from 'platformio-common/Utils/Debug';

/**
 * @param {ActionController} actionController
 * @param {CanvasWrapper} canvasWrapper
 * @constructor
 */
function BuilderController(actionController, canvasWrapper) {
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
    const action = new RemoveBuildableObjectAction(placedObject.hashableIdInterface.getHashId());
    actionController.addAction(action);
    placedObject = null;
  };

  this.placeObject = () => {
    placedObject.placeableObjectInterface.setAstralShifted(false);
    actionController.addAction(new SaveBuildableObjectAction(placedObject));
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
          true,
        );
      } else {
        placedObject = new Circle(
          position,
          1.5,
          new THREE.Color(Math.random() * 0xffffff),
          true,
        );
      }
    }
    placedObject.placeableObjectInterface.setPosition(position);
    actionController.addAction(new SaveBuildableObjectAction(placedObject));
  }
}

export default BuilderController;

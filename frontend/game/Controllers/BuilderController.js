import UpdatableInterface from 'common/Interfaces/UpdatableInterface';

import SaveBuildableObjectAction from 'common/Actions/SaveBuildableObjectAction';
import RemoveBuildableObjectAction from 'common/Actions/RemoveBuildableObjectAction';
import Rectangle from 'common/PlaceableObjects/Rectangle';
import Circle from 'common/PlaceableObjects/Circle';
import { log } from 'common/Utils/Debug';
import CommonVector2 from 'common/Math/CommonVector2';
import CommonColor from 'common/Math/CommonColor';
import { threeToCommonVector } from '../Utils/ThreeConverters';

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

      movePlacedObject(threeToCommonVector(canvasWrapper.getMouseWorldPosition()));
    },
  });

  this.activateBuilderMode = () => {
    log('Builder mode activated.');
    activated = true;
  };

  this.deactivateBuilderMode = () => {
    activated = false;
    if (!placedObject) {
      return;
    }
    const action = new RemoveBuildableObjectAction(placedObject.hashableIdInterface.getHashId());
    actionController.addAction(action);
    placedObject = null;
  };

  this.placeObject = () => {
    placedObject.placeableObjectInterface.setPlaced(true);
    actionController.addAction(new SaveBuildableObjectAction(placedObject));
    // We create a new object on update.
    placedObject = null;
  };

  /**
   * @param {CommonVector2} position
   */
  function movePlacedObject(position) {
    if (placedObject === null) {
      if (Math.random() >= 0.5) {
        placedObject = new Rectangle(
          position,
          new CommonVector2(3, 3),
          CommonColor.random(),
          false,
        );
      } else {
        placedObject = new Circle(
          position,
          1.5,
          CommonColor.random(),
          false,
        );
      }
    } else {
      placedObject.placeableObjectInterface.setPosition(position);
    }
    actionController.addAction(new SaveBuildableObjectAction(placedObject));
  }
}

export default BuilderController;

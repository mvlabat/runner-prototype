import * as THREE from 'three';

import Rectangle from '../BuildableObjects/Rectangle';
import Circle from '../BuildableObjects/Circle';

/**
 * @param {CanvasWrapper} canvasWrapper
 * @param {CameraWrapper} cameraWrapper
 * @param {SceneBuildableObjectManager} sceneObjectManager
 * @constructor
 */
function BuilderController(canvasWrapper, cameraWrapper, sceneObjectManager) {
  let placedObject = null;
  let mouseWorldPosition = new THREE.Vector2();

  this.onMouseMove = (event) => {
    mouseWorldPosition = getMouseWorldPosition(event);
    if (placedObject === null) {
      if (Math.random() >= 0.5) {
        placedObject = new Rectangle(
          mouseWorldPosition,
          new THREE.Vector2(3, 3),
          new THREE.Color(Math.random() * 0xffffff),
        );
      } else {
        placedObject = new Circle(
          mouseWorldPosition,
          1.5,
          new THREE.Color(Math.random() * 0xffffff),
        );
      }

      sceneObjectManager.addObject(placedObject);
    }

    placedObject.buildableObjectInterface.setPosition(mouseWorldPosition);
  };

  this.onMouseUp = () => {
    placedObject = null;
  };

  function getMouseWorldPosition(event) {
    const rect = canvasWrapper.getCanvas().getBoundingClientRect();
    const x = (event.clientX / rect.width) * 2 - 1;
    const y = -(event.clientY / rect.height) * 2 + 1;

    const viewportMousePosition = new THREE.Vector3(x, y, 0);
    const worldPosition = viewportMousePosition.clone().unproject(cameraWrapper.getCamera());
    worldPosition.z = 0;
    return worldPosition;
  }
}

export default BuilderController;

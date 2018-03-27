import * as THREE from 'three';

import Rectangle from './BuildableObjects/Rectangle';
import Circle from './BuildableObjects/Circle';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {OrthographicCamera} camera
 * @param {SceneBuildableObjectManager} sceneObjectManager
 * @constructor
 */
function BuilderController(canvas, camera, sceneObjectManager) {
  let placedObject = null;
  let mouseWorldPosition = new THREE.Vector2();

  canvas.addEventListener('mousemove', (event) => {
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
  });

  canvas.addEventListener('mouseup', () => {
    placedObject = null;
  });

  function getMouseWorldPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX / rect.width) * 2 - 1;
    const y = -(event.clientY / rect.height) * 2 + 1;

    const viewportMousePosition = new THREE.Vector3(x, y, 0);
    const worldPosition = viewportMousePosition.clone().unproject(camera);
    worldPosition.z = 0;
    return worldPosition;
  }
}

export default BuilderController;

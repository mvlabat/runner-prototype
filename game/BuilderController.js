import * as THREE from 'three';

import Rectangle from './BuildableObjects/Rectangle';

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
      placedObject = new Rectangle(
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 1),
        new THREE.Color(Math.random() * 0xffffff),
      );

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

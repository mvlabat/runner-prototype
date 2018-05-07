import * as THREE from 'three';

/**
 * @param {WebGLRenderer} renderer
 * @param {GameScene} gameScene
 * @param {CanvasWrapper} canvasWrapper
 * @param {CameraWrapper} cameraWrapper
 * @constructor
 */
function Renderer(renderer, gameScene, canvasWrapper, cameraWrapper) {
  const scene = new THREE.Scene();

  this.render = () => {
    updateRendererSize();
    updateMeshes();
    renderer.render(scene, cameraWrapper.getCamera());
  };

  renderer.setClearColor(new THREE.Color(0xEFEFEF));

  /**
   * @type {Map<string, Mesh>}
   */
  const renderedObjects = new Map();

  function updateRendererSize() {
    const { x: width, y: height } = canvasWrapper.getCanvasSize();
    if (renderer.domElement.width !== width || renderer.domElement.height !== width) {
      renderer.setSize(width, height, false);
    }
  }

  function updateMeshes() {
    for (const object of gameScene.getAllObjects()) {
      const hashId = object.hashableIdInterface.getHashId();
      if (!renderedObjects.has(hashId)) {
        renderedObjects.set(hashId, object);
        const objectRenderer = object.placeableObjectInterface.getRenderer();
        objectRenderer.objectRendererInterface.initialize(object);
        scene.add(objectRenderer.objectRendererInterface.getRootMesh());
      }
    }

    for (const [hashId, object] of renderedObjects) {
      const objectRenderer = object.placeableObjectInterface.getRenderer();
      if (gameScene.hasObject(hashId)) {
        objectRenderer.objectRendererInterface.renderUpdate();
      } else {
        renderedObjects.delete(hashId);
        scene.remove(objectRenderer.objectRendererInterface.getRootMesh());
      }
    }
  }
}

export default Renderer;

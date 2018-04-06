import * as THREE from 'three';
import RectangleRenderer from './Renderers/RectangleRenderer';
import CircleRenderer from './Renderers/CircleRenderer';

const objectRenderers = {
  circle: new CircleRenderer(),
  rectangle: new RectangleRenderer(),
};

export function RenderedObject(object, mesh) {
  this.object = object;
  this.mesh = mesh;
}

/**
 * @param {WebGLRenderer} renderer
 * @param {SceneObjectManager} sceneObjectManager
 * @param {CanvasWrapper} canvasWrapper
 * @param {CameraWrapper} cameraWrapper
 * @constructor
 */
function Renderer(renderer, sceneObjectManager, canvasWrapper, cameraWrapper) {
  const scene = new THREE.Scene();

  this.render = () => {
    updateRendererSize();
    addNewRenderedObjects();
    updateRenderedObjects();
    renderer.render(scene, cameraWrapper.getCamera());
  };

  renderer.setClearColor(new THREE.Color(0xEFEFEF));

  /**
   * @type {Map<string, RenderedObject>}
   */
  const renderedObjects = new Map();

  function updateRendererSize() {
    const { x: width, y: height } = canvasWrapper.getCanvasSize();
    if (renderer.domElement.width !== width || renderer.domElement.height !== width) {
      renderer.setSize(width, height, false);
    }
  }

  function addNewRenderedObjects() {
    for (const object of sceneObjectManager.getAllObjects()) {
      const objectHashId = object.hashableIdInterface.getHashId();
      if (!renderedObjects.has(objectHashId)) {
        useObjectRenderer(object, (objectRenderer) => {
          const mesh = objectRenderer.objectRendererInterface.createMesh(object);
          renderedObjects.set(objectHashId, new RenderedObject(object, mesh));
          scene.add(mesh);
        });
      }
    }
  }

  function updateRenderedObjects() {
    for (const [, renderedObject] of renderedObjects) {
      useObjectRenderer(renderedObject.object, (objectRenderer) => {
        objectRenderer.objectRendererInterface.renderUpdate(renderedObject);
      });
    }
  }

  function useObjectRenderer(object, lambda) {
    const objectRenderer = objectRenderers[object.placableObjectInterface.getType()];
    if (typeof objectRenderer !== 'undefined') {
      lambda(objectRenderer);
    } else {
      console.warn(`No renderer available for type '
        ${object.placableObjectInterface.getType()}
        ': Object("
        ${object.hashableIdInterface.getHashId()}
        ')`);
    }
  }
}

export default Renderer;

import * as THREE from 'three';
import RectangleRenderer from './Renderers/RectangleRenderer';

const objectRenderers = {
  rectangle: new RectangleRenderer(),
};

export function RenderedObject(object, mesh) {
  this.object = object;
  this.mesh = mesh;
}

export default function Renderer(sceneObjectManager) {
  this.startRendering = render;

  const renderer = new THREE.WebGLRenderer();
  const canvasWrapper = document.getElementById('canvas-wrapper');
  canvasWrapper.appendChild(renderer.domElement);

  /**
   * @returns {HTMLCanvasElement}
   */
  this.getCanvas = () => renderer.domElement;

  const camera = new THREE.OrthographicCamera();
  /**
   * @returns {OrthographicCamera}
   */
  this.getCamera = () => camera;

  renderer.setClearColor(new THREE.Color(0xEFEFEF));
  const scene = new THREE.Scene();
  camera.position.z = 0;

  /**
   * @type {Map<string, RenderedObject>}
   */
  const renderedObjects = new Map();

  function resizeCanvasToDisplaySize() {
    const width = canvasWrapper.clientWidth;
    const height = canvasWrapper.clientHeight;

    if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
      renderer.setSize(width, height, false);
      const [left, right, top, bottom] = cameraBounds();
      camera.left = left;
      camera.right = right;
      camera.top = top;
      camera.bottom = bottom;
      camera.near = 0;
      camera.zoom = 5;
      camera.far = Math.max(width, height) * 2;
      camera.updateProjectionMatrix();
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
    const objectRenderer = objectRenderers[object.buildableObjectInterface.getType()];
    if (typeof objectRenderer !== 'undefined') {
      lambda(objectRenderer);
    } else {
      console.warn(`No renderer available for type '
        ${object.buildableObjectInterface.getType()}
        ': Object("
        ${object.hashableIdInterface.getHashId()}
        ')`);
    }
  }

  function cameraBounds() {
    const width = canvasWrapper.clientWidth;
    const height = canvasWrapper.clientHeight;

    return [
      -width / 2, // left
      width / 2, // right
      height / 2, // top
      -height / 2, // bottom
    ];
  }

  let crashed = false;
  function render() {
    if (crashed) return;
    try {
      requestAnimationFrame(render);
      resizeCanvasToDisplaySize();
      addNewRenderedObjects();
      updateRenderedObjects();
      renderer.render(scene, camera);
    } catch (error) {
      crashed = true;
      throw error;
    }
  }
}

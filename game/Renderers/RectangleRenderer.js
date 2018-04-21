import * as THREE from 'three';

import ObjectRendererInterface from '../Interfaces/ObjectRendererInterface';

/**
 * @constructor
 */
function RectangleRenderer() {
  let rectangle = null;
  let mesh = null;

  this.objectRendererInterface = new ObjectRendererInterface(this, {

    initialize: (renderedObject) => {
      rectangle = renderedObject;
      const rectangleGeometry = new THREE.PlaneGeometry(
        rectangle.getSize().x,
        rectangle.getSize().y,
        1,
        1,
      );
      const rectangleMaterial = new THREE.MeshBasicMaterial({
        color: rectangle.placableObjectInterface.getColor().getHex(),
        side: THREE.DoubleSide,
      });
      mesh = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    },

    getRootMesh: () => mesh,

    renderUpdate: () => {
      const position = rectangle.placableObjectInterface.getPosition();
      mesh.position.x = position.x;
      mesh.position.y = position.y;
      mesh.material.color = rectangle.placableObjectInterface.getColor();
    },

  });
}

export default RectangleRenderer;

import * as THREE from 'three';

import { threeFromCommonColor } from '../Utils/ThreeConverters';
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
        color: threeFromCommonColor(rectangle.placeableObjectInterface.getColor()),
        side: THREE.DoubleSide,
      });
      mesh = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    },

    getRootMesh: () => mesh,

    renderUpdate: () => {
      const position = rectangle.placeableObjectInterface.getPosition();
      mesh.position.x = position.x;
      mesh.position.y = position.y;
      mesh.material.color = threeFromCommonColor(rectangle.placeableObjectInterface.getColor());
    },

  });
}

export default RectangleRenderer;

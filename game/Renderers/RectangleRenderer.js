import * as THREE from 'three';

import ObjectRendererInterface from '../Interfaces/ObjectRendererInterface';

function RectangleRenderer() {
  this.objectRendererInterface = new ObjectRendererInterface(this, {

    /**
     * @param {Rectangle} rectangle
     */
    createMesh: (rectangle) => {
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
      return new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    },

    /**
     * @param {RenderedObject} renderedObject
     */
    renderUpdate: (renderedObject) => {
      const { object, mesh } = renderedObject;
      const position = object.placableObjectInterface.getPosition();
      mesh.position.x = position.x;
      mesh.position.y = position.y;
      mesh.material.color = object.placableObjectInterface.getColor();
    },

  });
}

export default RectangleRenderer;

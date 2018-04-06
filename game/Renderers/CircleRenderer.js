import * as THREE from 'three';

import ObjectRendererInterface from '../Interfaces/ObjectRendererInterface';

function CircleRenderer() {
  this.objectRendererInterface = new ObjectRendererInterface(this, {

    /**
     * @param {Circle} circle
     */
    createMesh: (circle) => {
      const circleGeometry = new THREE.CircleBufferGeometry(circle.getRadius(), 32);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: circle.placableObjectInterface.getColor().getHex(),
        side: THREE.DoubleSide,
      });
      return new THREE.Mesh(circleGeometry, circleMaterial);
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

export default CircleRenderer;

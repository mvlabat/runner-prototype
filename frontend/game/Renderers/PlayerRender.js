import * as THREE from 'three';

import { threeFromCommonColor } from 'common/Utils/ThreeConverters';
import ObjectRendererInterface from '../Interfaces/ObjectRendererInterface';

/**
 * @constructor
 */
function PlayerRenderer() {
  let player = null;
  let mesh = null;

  this.objectRendererInterface = new ObjectRendererInterface(this, {

    /**
     * @param {Player} renderedObject
     */
    initialize: (renderedObject) => {
      player = renderedObject;
      const circleGeometry = new THREE.CircleBufferGeometry(player.getRadius(), 32);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: threeFromCommonColor(player.placeableObjectInterface.getColor()),
        side: THREE.DoubleSide,
      });
      mesh = new THREE.Mesh(circleGeometry, circleMaterial);
    },

    getRootMesh: () => mesh,

    renderUpdate: () => {
      const position = player.placeableObjectInterface.getPosition();
      mesh.position.x = position.x;
      mesh.position.y = position.y;
      mesh.position.z = 1;
      mesh.material.color = threeFromCommonColor(player.placeableObjectInterface.getColor());
    },

  });
}

export default PlayerRenderer;

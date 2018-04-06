import * as THREE from 'three';

/**
 * @param {GameScene} scene
 * @constructor
 */
import Player from '../Player';
import MovingDirections from '../Utils/Movement';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

function PlayerController(scene) {
  // INTERFACES IMPLEMENTATION.

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {

    },
  });

  this.enable = () => {
    addPlayer(new THREE.Vector2());
  };

  const movingDirections = new MovingDirections();

  this.setMovementDirection = (direction, enable) => {
    movingDirections[direction] = enable;
  };

  /**
   * @param position
   */
  function addPlayer(position) {
    const player = new Player(position);
    scene.addPlayer(player);
  }
}

export default PlayerController;

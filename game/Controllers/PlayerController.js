import * as THREE from 'three';

import Player from '../Player';
import MovingDirections from '../Utils/Movement';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

/**
 * @param {GameScene} gameScene
 * @constructor
 */
function PlayerController(gameScene) {
  let player = null;

  // INTERFACES IMPLEMENTATION.

  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {

    },
  });

  // CLASS IMPLEMENTATION.

  this.activatePlayerMode = () => {
    addPlayer(new THREE.Vector2());
  };

  this.deactivatePlayerMode = () => {
    removePlayer();
  };

  const movingDirections = new MovingDirections();

  this.setMovementDirection = (direction, enable) => {
    movingDirections[direction] = enable;
  };

  /**
   * @param {Vector2} position
   */
  function addPlayer(position) {
    player = new Player(position);
    gameScene.addPlayer(player);
  }

  function removePlayer() {
    gameScene.removePlayer(player.hashableIdInterface.getHashId());
    player = null;
  }
}

export default PlayerController;

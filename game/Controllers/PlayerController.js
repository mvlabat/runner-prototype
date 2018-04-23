import * as THREE from 'three';

import Player from '../Player';
import MovingDirections from '../Utils/Movement';
import { log } from '../Utils/Debug';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

/**
 * @param {GameScene} gameScene
 * @param {CameraWrapper} cameraWrapper
 * @constructor
 */
function PlayerController(gameScene, cameraWrapper) {
  let activated = false;
  let player = null;

  // INTERFACES IMPLEMENTATION.

  this.updatableInterface = new UpdatableInterface(this, {
    update: (timeDelta) => {
      if (!activated) {
        return;
      }

      movePlayer(timeDelta);
    },
  });

  // CLASS IMPLEMENTATION.

  this.activatePlayerMode = () => {
    activated = true;
    log('Player mode activated.');
    addPlayer(new THREE.Vector2());
  };

  this.deactivatePlayerMode = () => {
    activated = false;
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

  const PLAYER_SPEED = 50;

  function movePlayer(timeDelta) {
    const offsetVector = movingDirections
      .getDirectionVector()
      .multiplyScalar(PLAYER_SPEED * timeDelta);
    const newPosition = player.placeableObjectInterface.getPosition().add(offsetVector);
    player.placeableObjectInterface.setPosition(newPosition);
    cameraWrapper.setPosition(newPosition);
  }
}

export default PlayerController;

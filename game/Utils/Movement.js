import * as THREE from 'three';

function MovingDirections() {
  this.up = false;
  this.left = false;
  this.down = false;
  this.right = false;

  /**
   * @returns {Vector2}
   */
  this.getDirectionVector = () => {
    let angle = 0;

    if (this.up && this.right && !this.down && !this.left) {
      angle = 45;
    } else if (this.up && !this.right && !this.down && this.left) {
      angle = 135;
    } else if (!this.up && !this.right && this.down && this.left) {
      angle = 225;
    } else if (!this.up && this.right && this.down && !this.left) {
      angle = 315;
    } else if (this.right && !this.left) {
      angle = 0;
    } else if (this.up && !this.down) {
      angle = 90;
    } else if (!this.right && this.left) {
      angle = 180;
    } else if (!this.up && this.down) {
      angle = 270;
    } else {
      return new THREE.Vector2();
    }

    return new THREE.Vector2(1, 0).rotateAround(new THREE.Vector2(), angle * THREE.Math.DEG2RAD);
  };
}

export default MovingDirections;

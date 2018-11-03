import CommonVector2 from 'common/Math/CommonVector2';

function MovementDirections() {
  this.up = false;
  this.left = false;
  this.down = false;
  this.right = false;

  /**
   * @returns {CommonVector2}
   */
  this.getDirectionVector = () => {
    const directionVector = new CommonVector2(1, 0);

    if (this.up && this.right && !this.down && !this.left) {
      directionVector.angle = 45;
    } else if (this.up && !this.right && !this.down && this.left) {
      directionVector.angle = 135;
    } else if (!this.up && !this.right && this.down && this.left) {
      directionVector.angle = 225;
    } else if (!this.up && this.right && this.down && !this.left) {
      directionVector.angle = 315;
    } else if (this.right && !this.left) {
      directionVector.angle = 0;
    } else if (this.up && !this.down) {
      directionVector.angle = 90;
    } else if (!this.right && this.left) {
      directionVector.angle = 180;
    } else if (!this.up && this.down) {
      directionVector.angle = 270;
    } else {
      directionVector.set(0, 0);
    }

    return directionVector;
  };
}

export default MovementDirections;

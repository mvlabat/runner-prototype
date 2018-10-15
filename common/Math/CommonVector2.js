import Paper from '../Paper';
import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {number=0} x
 * @param {number=0} y
 * @constructor
 */
function CommonVector2(x, y) {
  Object.defineProperty(this, 'nativeVector', {
    value: new Paper.Point(),
  });

  /**
   * @param {number} newX
   * @param {number} newY
   */
  this.set = (newX, newY) => {
    assertCoord('x', newX);
    assertCoord('y', newY);
    this.nativeVector.set(newX, newY);
  };

  this.set(x || 0, y || 0);

  Object.defineProperty(this, 'x', {
    get: () => this.nativeVector.x,
    set: (value) => {
      assertCoord('x', value);
      this.nativeVector.x = value;
    },
  });

  Object.defineProperty(this, 'y', {
    get: () => this.nativeVector.y,
    set: (value) => {
      assertCoord('y', value);
      this.nativeVector.y = value;
    },
  });

  Object.defineProperty(this, 'angle', {
    get: () => this.nativeVector.angle,
    set: (value) => {
      this.nativeVector.angle = value;
    },
  });

  /**
   * @return {CommonVector2}
   */
  this.clone = () => new CommonVector2(this.x, this.y);

  /**
   * @param {CommonVector2} vector
   * @return {CommonVector2}
   */
  this.add = (vector) => {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  };

  /**
   * @param {number} value
   * @return {CommonVector2}
   */
  this.multiplyScalar = (value) => {
    this.nativeVector.multiply(value);
    return this;
  };

  function assertCoord(propertyKey, value) {
    const type = typeof value;
    if (type !== 'number') {
      throw new Error(
        `Tried to set CommonVector2::${propertyKey} with not a numeric value: ${value} (${type})`,
      );
    }
  }
}

/**
 * @return {CommonVector2}
 */
CommonVector2.fromArray = array => new CommonVector2(array[0], array[1]);

/**
 * @return {CommonVector2}
 */
CommonVector2.fromObject = object => new CommonVector2(object.x, object.y);

CommonVector2.serializableInterface = new SerializableInterface(CommonVector2, {
  serialize: object => ({
    x: () => object.x,
    y: () => object.y,
  }),

  deserialize: object => new CommonVector2(object.x, object.y),
});

export default CommonVector2;

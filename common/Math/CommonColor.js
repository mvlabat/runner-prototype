import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param rgbArray
 * @constructor
 */
function CommonColor(rgbArray) {
  Object.defineProperty(this, 'rgbArray', {
    value: (rgbArray && new Uint8Array(rgbArray.slice(0, 3))) || new Uint8Array(3),
  });

  Object.defineProperty(this, 'r', {
    get: () => this.rgbArray[0],
    set: (value) => {
      this.rgbArray[0] = value;
    },
  });

  Object.defineProperty(this, 'g', {
    get: () => this.rgbArray[1],
    set: (value) => {
      this.rgbArray[1] = value;
    },
  });

  Object.defineProperty(this, 'b', {
    get: () => this.rgbArray[2],
    set: (value) => {
      this.rgbArray[2] = value;
    },
  });

  this.clone = () => new CommonColor(this.rgbArray);
}

CommonColor.random = () => {
  const rgbArray = new Uint8Array(3);
  rgbArray[0] = Math.floor(Math.random() * 255);
  rgbArray[1] = Math.floor(Math.random() * 255);
  rgbArray[2] = Math.floor(Math.random() * 255);
  return new CommonColor(rgbArray);
};

CommonColor.serializableInterface = new SerializableInterface(CommonColor, {
  serialize: object => ({
    value: () => object.rgbArray,
  }),

  deserialize: object => new CommonColor(object.value),
});

export default CommonColor;

import HashableIdInterface from '../Interfaces/HashableIdInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import {
  vector2Serialize,
  vector2Deserialize,
  colorSerialize,
  colorDeserialize,
} from '../Utils/ThreeJsonSerializes';
import SavableInterface from '../Interfaces/SavableInterface';

function Circle(position, radius, color, isAstralShifted, predefinedHashId = '') {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () =>
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placeableObjectInterface = new PlaceableObjectInterface(this, {
    getType: () => 'circle',

    getPosition: () => parameters.position,
    setPosition: (newPosition) => {
      parameters.position = newPosition;
      setDebugProperty(this, 'position', newPosition);
      return this;
    },

    getColor: () => parameters.color,
    setColor: (newColor) => {
      parameters.color = newColor;
      setDebugProperty(this, 'color', newColor);
      return this;
    },

    isAstralShifted: () => isAstralShifted,
    setAstralShifted: (newIsAstralShifted) => {
      parameters.isAstralShifted = newIsAstralShifted;
      setDebugProperty(this, 'isAstralShifted', newIsAstralShifted);
      return this;
    },
  });

  this.savableInterface = new SavableInterface(this, {
    /**
     * @param {Circle} newEntity
     */
    save: (newEntity) => {
      const newPosition = newEntity.placeableObjectInterface.getPosition();
      if (newPosition !== undefined) {
        this.placeableObjectInterface.setPosition(newPosition.clone());
      }

      const newColor = newEntity.placeableObjectInterface.getColor();
      if (newColor !== undefined) {
        this.placeableObjectInterface.setColor(newColor.clone());
      }

      const newRadius = newEntity.getRadius();
      if (newRadius !== undefined) {
        this.setRadius(newRadius);
      }

      const newIsAstralShifted = newEntity.placeableObjectInterface.isAstralShifted();
      if (newIsAstralShifted !== undefined) {
        this.placeableObjectInterface.setAstralShifted(newIsAstralShifted);
      }
      return this;
    },
  });

  // CLASS IMPLEMENTATION.
  this.getRadius = () => parameters.radius;
  this.setRadius = (newRadius) => {
    parameters.radius = newRadius;
    setDebugProperty(this, 'Radius', newRadius);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.setRadius(radius);
  this.placeableObjectInterface.setColor(color);
  this.placeableObjectInterface.setAstralShifted(isAstralShifted);
}

Circle.jsonSerializableInterface = new JsonSerializableInterface(Circle, {
  serialize: object => ({
    hashId: object.hashableIdInterface.getHashId(),
    position: vector2Serialize(object.placeableObjectInterface.getPosition()),
    radius: object.getRadius(),
    color: colorSerialize(object.placeableObjectInterface.getColor()),
    isAstralShifted: object.placeableObjectInterface.isAstralShifted(),
    type: object.placeableObjectInterface.getType(),
  }),

  deserialize: json => new Circle(
    vector2Deserialize(json.position),
    json.radius,
    colorDeserialize(json.color),
    json.isAstralShifted,
    json.hashId,
  ),
});

export default Circle;

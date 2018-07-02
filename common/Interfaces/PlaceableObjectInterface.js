import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * @param object
 * @param interfaceImplementation
 * @constructor
 */
function PlaceableObjectInterface(object, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, object, interfaceImplementation);

  this.getType = () => implementation.callMethod('getType');

  this.setPosition = position => implementation.callMethod('setPosition', position);
  this.getPosition = () => implementation.callMethod('getPosition');

  this.setColor = color => implementation.callMethod('setColor', color);
  this.getColor = () => implementation.callMethod('getColor');

  this.setAstralShifted = isAstralShifted =>
    implementation.callMethod('setAstralShifted', isAstralShifted);
  this.isAstralShifted = () => implementation.callMethod('isAstralShifted');

  let objectScene = null;
  this.setScene = (scene) => {
    objectScene = scene;
    return this;
  };
  this.getScene = () => objectScene;
}

PlaceableObjectInterface.assert = (entity) => {
  assertInterface(entity.placeableObjectInterface, PlaceableObjectInterface);
};

PlaceableObjectInterface.has = entity =>
  isInterface(entity.placeableObjectInterface, PlaceableObjectInterface);

export default PlaceableObjectInterface;

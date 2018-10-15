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
  /**
   * @return {CommonVector2}
   */
  this.getPosition = () => implementation.callMethod('getPosition');

  this.setColor = color => implementation.callMethod('setColor', color);
  this.getColor = () => implementation.callMethod('getColor');

  this.setPlaced = isPlaced => implementation.callMethod('setPlaced', isPlaced);
  this.isPlaced = () => implementation.callMethod('isPlaced');

  this.recalculatePath = () => implementation.callMethod('recalculatePath');
  this.getPath = () => implementation.callMethod('getPath');

  let objectScene = null;
  this.setScene = (scene) => {
    objectScene = scene;
  };
  this.getScene = () => objectScene;
}

PlaceableObjectInterface.assert = (entity) => {
  assertInterface(entity.placeableObjectInterface, PlaceableObjectInterface);
};

PlaceableObjectInterface.has = entity => (
  isInterface(entity.placeableObjectInterface, PlaceableObjectInterface)
);

export default PlaceableObjectInterface;

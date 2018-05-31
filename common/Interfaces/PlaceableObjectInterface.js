import InterfaceImplementation from '../Utils/InterfaceImplementation';

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

export default PlaceableObjectInterface;

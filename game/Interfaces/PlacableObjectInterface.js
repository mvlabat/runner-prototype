import InterfaceImplementation from '../Utils/InterfaceImplementation';

function PlacableObjectInterface(object, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, interfaceImplementation);

  this.getType = () => implementation.callMethod('getType');

  this.setPosition = position => implementation.callMethod('setPosition', position);
  this.getPosition = () => implementation.callMethod('getPosition');

  this.setColor = color => implementation.callMethod('setColor', color);
  this.getColor = () => implementation.callMethod('getColor');

  let objectScene = null;
  this.setScene = (scene) => {
    objectScene = scene;
    return this;
  };
  this.getScene = () => objectScene;

  this.calculateHashId = () => {
    object.hashableIdInterface.calculateHashId();
    return this;
  };
}

export default PlacableObjectInterface;

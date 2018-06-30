import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * @param object
 * @param interfaceImplementation
 * @constructor
 */
function UpdatableInterface(object, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, object, interfaceImplementation);

  this.update = timeDelta => implementation.callMethod('update', timeDelta);
}

export default UpdatableInterface;

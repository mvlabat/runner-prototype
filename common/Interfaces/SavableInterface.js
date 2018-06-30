import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * @param entity
 * @param interfaceImplementation
 * @constructor
 */
function SavableInterface(entity, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, entity, interfaceImplementation);

  this.save = newEntity => implementation.callMethod('save', newEntity);
}

export default SavableInterface;

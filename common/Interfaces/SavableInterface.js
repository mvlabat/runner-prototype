import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * @param entity
 * @param interfaceImplementation
 * @constructor
 */
function SavableInterface(entity, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, entity, interfaceImplementation);

  this.save = newEntity => implementation.callMethod('save', newEntity);
}

SavableInterface.assert = (entity) => {
  assertInterface(entity.savableInterface, SavableInterface);
};

SavableInterface.has = entity => isInterface(entity.savableInterface, SavableInterface);

export default SavableInterface;

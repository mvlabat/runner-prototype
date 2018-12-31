import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * SaveableInterface must be implemented for instances (inside a constructor).
 * Required methods:
 * - save
 *
 * SavableInterface is implemented for objects that have to be able to copy properties of another
 * object of the same class.
 *
 * A common usage case: processing a network message, containing an object that reflects changes
 * to another existing object.
 *
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

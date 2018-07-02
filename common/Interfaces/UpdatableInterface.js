import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * @param object
 * @param interfaceImplementation
 * @constructor
 */
function UpdatableInterface(object, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, object, interfaceImplementation);

  this.update = timeDelta => implementation.callMethod('update', timeDelta);
}

UpdatableInterface.assert = (entity) => {
  assertInterface(entity.updatableInterface, UpdatableInterface);
};

UpdatableInterface.has = entity => isInterface(entity.updatableInterface, UpdatableInterface);

export default UpdatableInterface;

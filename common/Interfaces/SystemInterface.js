import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * @param entity
 * @param interfaceImplementation
 * @constructor
 */
function SystemInterface(entity, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, entity, interfaceImplementation);

  /**
   * @param {Function} processedEntity
   * @returns {boolean}
   */
  this.canProcess = processedEntity => implementation.callMethod('canProcess', processedEntity);

  /**
   * Immediately executes action or adds it to execution queue.
   * @param processedEntity
   */
  this.process = processedEntity => implementation.callMethod('process', processedEntity);
}

SystemInterface.assert = (entity) => {
  assertInterface(entity.systemInterface, SystemInterface);
};

SystemInterface.has = entity => isInterface(entity.systemInterface, SystemInterface);

export default SystemInterface;

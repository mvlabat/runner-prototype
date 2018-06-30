import InterfaceImplementation from '../Utils/InterfaceImplementation';

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

export default SystemInterface;

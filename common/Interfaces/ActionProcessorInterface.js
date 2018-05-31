import InterfaceImplementation from '../Utils/InterfaceImplementation';

function ActionProcessorInterface(entity, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, entity, interfaceImplementation);

  /**
   * @param {Function} actionClass
   * @returns {boolean}
   */
  this.canProcess = actionClass => implementation.callMethod('canProcess', actionClass);

  /**
   * Immediately executes action or adds it to execution queue.
   * @param action
   */
  this.processAction = action => implementation.callMethod('processAction', action);
}

export default ActionProcessorInterface;

import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * @param action
 * @param interfaceImplementation
 * @constructor
 */
function ActionInterface(action, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, action, interfaceImplementation);

  this.getTimeOccurred = () => implementation.callMethod('getTimeOccurred');

  this.setTimeOccurred = time => implementation.callMethod('setTimeOccurred', time);
}

ActionInterface.assert = (entity) => {
  assertInterface(entity.actionInterface, ActionInterface);
};

ActionInterface.has = entity => isInterface(entity.actionInterface, ActionInterface);

export default ActionInterface;

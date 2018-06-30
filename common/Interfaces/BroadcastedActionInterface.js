import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * @param action
 * @param interfaceImplementation
 * @constructor
 */
function BroadcastedActionInterface(action, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, action, interfaceImplementation);

  this.getSenderId = () => implementation.callMethod('getSenderId');

  this.setSenderId = senderId =>
    implementation.callMethod('setSenderId', senderId);

  this.isBroadcastedAfterExecution = () =>
    implementation.callMethodOr(false, 'isBroadcastedAfterExecution');
}

export default BroadcastedActionInterface;

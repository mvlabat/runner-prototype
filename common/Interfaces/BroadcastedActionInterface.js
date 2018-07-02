import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

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

BroadcastedActionInterface.assert = (entity) => {
  assertInterface(entity.broadcastedActionInterface, BroadcastedActionInterface);
};

BroadcastedActionInterface.has = entity =>
  isInterface(entity.broadcastedActionInterface, BroadcastedActionInterface);

export default BroadcastedActionInterface;

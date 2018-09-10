import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';
import { setDebugProperty } from '../Utils/Debug';

export const SERVER_SENDER_ID = -1;

/**
 * @param action
 * @param interfaceImplementation
 * @constructor
 */
function BroadcastedActionInterface(action, interfaceImplementation) {
  let senderId = null;

  const implementation = new InterfaceImplementation(this, action, interfaceImplementation);

  this.getSenderId = () => senderId;

  this.setSenderId = (newSenderId) => {
    senderId = newSenderId;
    setDebugProperty(action, 'senderId', senderId);
  };

  this.isBroadcastedAfterExecution = () => (
    implementation.callMethodOr(false, 'isBroadcastedAfterExecution')
  );
}

BroadcastedActionInterface.assert = (entity) => {
  assertInterface(entity.broadcastedActionInterface, BroadcastedActionInterface);
};

BroadcastedActionInterface.has = entity => (
  isInterface(entity.broadcastedActionInterface, BroadcastedActionInterface)
);

export default BroadcastedActionInterface;

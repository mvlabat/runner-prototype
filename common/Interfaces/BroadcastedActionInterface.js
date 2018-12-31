import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';
import { setDebugProperty } from '../Utils/Debug';

export const SERVER_SENDER_ID = -1;

/**
 * BroadcastedActionInterface must be implemented for instances (inside a constructor).
 * Optional methods:
 * - isBroadcastedAfterExecution
 *
 * BroadcastedActionInterface has to be implemented for all the actions that have to be broadcasted
 * over a network. The implementation itself can be empty or have `isBroadcastedAfterExecution`,
 * which can be used for indicating that action can't be processed at once.
 *
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

  /**
   * If this function returns true, the action will be executed during a game tick, otherwise it'll
   * be executed once received.
   *
   * @return {boolean}
   */
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

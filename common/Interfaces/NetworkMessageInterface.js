import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';
import EngineConfig from '../EngineConfig';

/**
 * NetworkMessageInterface must be implemented for instances (inside a constructor).
 * It has no methods to implement.
 *
 * NetworkMessageInterface is meant to be used only when a message is supposed to be sent to server,
 * including (but not mandatory) messages that are broadcasted to all other clients by server.
 * You shouldn't use it for messages that originate only from server (like `PingMessage`).
 *
 * @param message
 * @param interfaceImplementation
 * @constructor
 */
function NetworkMessageInterface(message, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, message, interfaceImplementation);
  let senderId = null;

  /**
   * This method is optional to implement. For now it's only required for BroadcastActionMessage.
   */
  this.getPayload = () => implementation.callMethod('getPayload');

  /**
   * Sender ID is optional message field which is set only by server. It is used in limited cases:
   * for instance, action senderId is populated from message.
   *
   * This field is never serialized.
   *
   * @returns {number|null}
   */
  this.getSenderId = () => senderId;

  /**
   * @param {number} newSenderId
   */
  this.setSenderId = (newSenderId) => {
    if (EngineConfig.isClient()) {
      throw new Error("Message 'senderId' field is supposed to be set only on server side");
    }
    senderId = newSenderId;
  };
}

NetworkMessageInterface.assert = (entity) => {
  assertInterface(entity.networkMessageInterface, NetworkMessageInterface);
};

NetworkMessageInterface.has = entity => (
  isInterface(entity.networkMessageInterface, NetworkMessageInterface)
);

export default NetworkMessageInterface;

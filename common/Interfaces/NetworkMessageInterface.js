import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * @param message
 * @param interfaceImplementation
 * @constructor
 */
function NetworkMessageInterface(message, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, message, interfaceImplementation);

  this.getPayload = () => implementation.callMethod('getPayload');

  /**
   * Sender ID is optional message field which is set only by server. It is used in limited cases:
   * for instance, action senderId is populated from messageId.
   *
   * This field is never serialized.
   *
   * @returns {number|null}
   */
  this.getSenderId = () => implementation.callMethod('getSenderId');
}

export default NetworkMessageInterface;

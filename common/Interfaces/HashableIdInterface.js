import nonce from 'nonce';
import sha256 from 'crypto-js/sha256';

import InterfaceImplementation from '../Utils/InterfaceImplementation';

const generateNonce = nonce();

/**
 * @param entity
 * @param predefinedHashId
 * @param interfaceImplementation
 * @constructor
 */
function HashableIdInterface(entity, predefinedHashId, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, entity, interfaceImplementation);
  let hashId = predefinedHashId;

  this.calculateHashId = () => {
    const hashedContent = implementation.callMethodOr('', 'getHashedContent', entity);
    hashId = sha256(hashedContent + generateNonce()).toString();
    return this;
  };

  this.getHashId = () => hashId;
}

export default HashableIdInterface;

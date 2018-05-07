import nonce from 'nonce';
import sha256 from 'crypto-js/sha256';
import InterfaceImplementation from '../Utils/InterfaceImplementation';

function HashableIdInterface(entity, predefinedHashId, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, interfaceImplementation);
  let hashId = predefinedHashId;

  this.calculateHashId = () => {
    const hashedContent = implementation.defaultUnlessCall('', 'getHashedContent', entity);
    hashId = sha256(hashedContent + nonce());
    return this;
  };

  this.getHashId = () => hashId;
}

export default HashableIdInterface;

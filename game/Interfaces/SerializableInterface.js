import InterfaceImplementation from '../Utils/InterfaceImplementation';

function SerializableInterface(entity, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, interfaceImplementation);

  this.serialize = object => implementation.callMethod('serialize', object);

  this.deserialize = json => implementation.callMethod('deserialize', json);
}

export default SerializableInterface;

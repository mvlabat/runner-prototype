import InterfaceImplementation from '../Utils/InterfaceImplementation';

function UpdatableInterface(object, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, object, interfaceImplementation);

  this.update = timeDelta => implementation.callMethod('update', timeDelta);
}

export default UpdatableInterface;

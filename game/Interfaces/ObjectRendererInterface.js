import InterfaceImplementation from '../Utils/InterfaceImplementation';

function ObjectRendererInterface(renderer, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, interfaceImplementation);

  this.initialize = renderedObject => implementation.callMethod('initialize', renderedObject);

  this.getRootMesh = () => implementation.callMethod('getRootMesh');

  this.renderUpdate = () => implementation.callMethod('renderUpdate');
}

export default ObjectRendererInterface;

import InterfaceImplementation from '../Utils/InterfaceImplementation';

function ObjectRendererInterface(renderer, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, interfaceImplementation);

  this.createMesh = object => implementation.callMethod('createMesh', object);

  this.renderUpdate = renderedObject => implementation.callMethod('renderUpdate', renderedObject);
}

export default ObjectRendererInterface;

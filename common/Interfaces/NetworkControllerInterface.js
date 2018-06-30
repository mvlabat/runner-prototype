import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * @param networkController
 * @param interfaceImplementation
 * @constructor
 */
function NetworkControllerInterface(networkController, interfaceImplementation) {
  const implementation = new InterfaceImplementation(
    this,
    networkController,
    interfaceImplementation,
  );

  this.broadcastAction = action => implementation.callMethod('broadcastAction', action);
}

export default NetworkControllerInterface;

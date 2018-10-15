export class NotImplementedMethodError extends Error {
  constructor(interfaceImplementer, interfaceClass, method, message) {
    super();
    this.name = 'NotImplementedMethodError';
    this.interfaceImplementer = interfaceImplementer;
    this.interfaceClass = interfaceClass;
    this.method = method;

    const implementerClassName = getImplementerClassName(interfaceImplementer);
    const methodName = `${interfaceClass.constructor.name}::${method}`;
    this.message = message
      || `'${methodName}' method is not implemented in ${implementerClassName}`;
    Error.captureStackTrace(this, NotImplementedMethodError);
  }
}

export class NotImplementedInterfaceError extends Error {
  constructor(interfaceImplementer, interfaceClass, message) {
    super();
    this.name = 'NotImplementedMethodError';
    this.interfaceImplementer = interfaceImplementer;
    this.interfaceClass = interfaceClass;

    const implementerClassName = getImplementerClassName(interfaceImplementer);
    this.message = message
      || `'${interfaceClass.name}' interface is not implemented for ${implementerClassName}`;
    Error.captureStackTrace(this, NotImplementedInterfaceError);
  }
}

function getImplementerClassName(interfaceImplementer) {
  const type = typeof interfaceImplementer;
  if (type === 'function') {
    return interfaceImplementer.name;
  }
  if (type === 'object') {
    return interfaceImplementer.constructor.name;
  }
  return type;
}

/**
 * @param {object} interfaceInstance
 * @param {Function} InterfaceConstructor
 * @returns {boolean}
 */
export function isInterface(interfaceInstance, InterfaceConstructor) {
  return interfaceInstance && interfaceInstance.constructor === InterfaceConstructor;
}

/**
 * @param {object} interfaceInstance
 * @param {Function} InterfaceConstructor
 */
export function assertInterface(interfaceInstance, InterfaceConstructor) {
  if (!isInterface(interfaceInstance, InterfaceConstructor)) {
    throw new NotImplementedInterfaceError(interfaceInstance, InterfaceConstructor);
  }
}

function InterfaceImplementation(interfaceClass, implementerClass, implementation) {
  this.callMethod = (method, ...args) => {
    if (methodIsImplemented(implementation, method)) {
      return implementation[method].call(interfaceClass, ...args);
    }
    throw new NotImplementedMethodError(implementerClass, interfaceClass, method);
  };

  this.callMethodOr = (defaultValue, method, ...args) => {
    if (methodIsImplemented(implementation, method)) {
      return implementation[method].call(interfaceClass, ...args);
    }
    return defaultValue;
  };

  function methodIsImplemented(interfaceImplementation, method) {
    return typeof interfaceImplementation[method] === 'function';
  }
}

export default InterfaceImplementation;

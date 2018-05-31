export class NotImplementedMethodError extends Error {
  constructor(interfaceImplementer, interfaceClass, method, message) {
    super();
    this.name = 'NotImplementedMethodError';
    this.interfaceImplementer = interfaceImplementer;
    this.interfaceClass = interfaceClass;
    this.method = method;
    const implementerClassName = typeof interfaceImplementer === 'function'
      ? interfaceImplementer.name
      : interfaceImplementer.constructor.name;
    const methodName = `${interfaceClass.constructor.name}::${method}`;
    this.message = message || `'${methodName}' method is not implemented in ${implementerClassName}`;
    Error.captureStackTrace(this, NotImplementedMethodError);
  }
}

/**
 * @param {object} object
 * @param {Function} interfaceConstructor
 * @returns {boolean}
 */
export function hasInterface(object, interfaceConstructor) {
  // TODO: refactor to assertInterface or getInterface maybe?
  const constructorName = interfaceConstructor.name;
  const interfaceProperty = constructorName.substr(0, 1).toLowerCase() + constructorName.substr(1);
  return Object.prototype.hasOwnProperty.call(object, interfaceProperty)
    && object[interfaceProperty].constructor === interfaceConstructor;
}

function InterfaceImplementation(interfaceClass, implementerClass, implementation) {
  this.callMethod = (method, ...args) => {
    if (isImplemented(implementation, method)) {
      return implementation[method].call(interfaceClass, ...args);
    }
    throw new NotImplementedMethodError(implementerClass, interfaceClass, method);
  };

  this.defaultUnlessCall = (defaultValue, method, ...args) => {
    if (isImplemented(implementation, method)) {
      return implementation[method].call(interfaceClass, ...args);
    }
    return defaultValue;
  };

  function isImplemented(interfaceImplementation, method) {
    return typeof interfaceImplementation[method] === 'function';
  }
}

export default InterfaceImplementation;

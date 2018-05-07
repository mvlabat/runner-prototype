export class NotImplementedError extends Error {
  constructor(interfaceClass, method, message) {
    super();
    this.name = 'NotImplementedError';
    this.interfaceClass = interfaceClass;
    this.method = method;
    this.message = message || '';
    Error.captureStackTrace(this, NotImplementedError);
  }
}

function InterfaceImplementation(interfaceClass, implementation) {
  this.callMethod = (method, ...args) => {
    if (isImplemented(implementation, method)) {
      return implementation[method].call(interfaceClass, ...args);
    }
    throw new NotImplementedError(interfaceClass, method);
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

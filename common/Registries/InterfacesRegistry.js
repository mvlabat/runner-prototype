const registry = new Map();

/**
 * @constructor
 */
const InterfacesRegistry = {
  /**
   * @param {Function} constructor
   */
  registerInterface: (constructor) => {
    registry.set(constructor.name, constructor);
  },

  getInterface: name => registry.get(name),

  hasInterface: name => registry.has(name),
};

export default InterfacesRegistry;

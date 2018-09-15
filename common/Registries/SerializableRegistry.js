const registry = new Map();

/**
 * @constructor
 */
const SerializableRegistry = {
  /**
   * @param {Function} constructor
   */
  registerConstructor: (constructor) => {
    registry.set(constructor.name, constructor);
  },

  getConstructor: name => registry.get(name),

  hasConstructor: name => registry.has(name),
};

export default SerializableRegistry;

const JsonSerializableRegistry = (() => {
  const registry = new Map();

  return {
    /**
     * @param {Function} constructor
     */
    registerConstructor: (constructor) => {
      registry.set(constructor.name, constructor);
    },

    getConstructor: name => registry.get(name),
  };
})();

export default JsonSerializableRegistry;

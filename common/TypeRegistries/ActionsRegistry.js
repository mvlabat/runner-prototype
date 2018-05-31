const ActionsRegistry = (() => {
  const registry = new Map();

  return {
    /**
     * @param {Function} actionConstructor
     */
    registerActionType: (actionConstructor) => {
      registry.set(actionConstructor.name, actionConstructor);
    },

    getActionType: name => registry.get(name),
  };
})();

export default ActionsRegistry;

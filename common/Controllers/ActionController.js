function ActionController() {
  let actionsQueue = [];

  this.addAction = (action) => {
    action.actionInterface.setTimeOccurred(0); // TODO: set actual game time.
    actionsQueue.push(action);
  };

  this.drainActions = () => {
    const actions = actionsQueue;
    actionsQueue = [];
    return actions;
  };
}

export default ActionController;

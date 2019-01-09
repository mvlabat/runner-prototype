/**
 * @constructor
 */
function BroadcastedActionsQueue() {
  const queue = [];

  this.addAction = (action) => {
    queue.push(action);
  };

  this.clearActions = () => {
    queue.length = 0;
  };

  /**
   * @returns {*[]}
   */
  this.getActions = () => Array.from(queue);
}

export default BroadcastedActionsQueue;

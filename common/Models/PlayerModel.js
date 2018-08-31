/**
 * @param clientId
 * @constructor
 */
function PlayerModel(clientId = null) {
  this.clientId = clientId;
  this.displayName = '';
  this.latency = 0;
}

export default PlayerModel;

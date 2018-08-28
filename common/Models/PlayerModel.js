function PlayerModel(clientId = null) {
  this.clientId = clientId;
  this.displayName = '';
  this.latency = null;
}

export default PlayerModel;

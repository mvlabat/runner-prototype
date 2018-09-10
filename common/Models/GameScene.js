import HashableIdInterface from '../Interfaces/HashableIdInterface';

/**
 * @constructor
 */
function GameScene() {
  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, '', {});

  // CLASSES IMPLEMENTATION.
  const objects = new Map();
  this.getAllObjects = () => objects.values();
  this.getObject = hashId => objects.get(hashId);
  this.hasObject = hashId => objects.has(hashId);

  const buildableObjects = new Map();
  this.addBuildableObject = (object) => {
    object.placeableObjectInterface.setScene(this);
    if (!object.hashableIdInterface.getHashId()) {
      object.hashableIdInterface.calculateHashId();
    }
    objects.set(object.hashableIdInterface.getHashId(), object);
    buildableObjects.set(object.hashableIdInterface.getHashId(), object);
    return this;
  };
  this.getBuildableObject = hashId => buildableObjects.get(hashId);
  this.hasBuildableObject = hashId => buildableObjects.has(hashId);
  this.getAllBuildableObjects = () => buildableObjects.values();
  this.removeBuildableObject = (hashId) => {
    objects.delete(hashId);
    buildableObjects.delete(hashId);
  };

  /**
   * @type {Map<string, Player>}
   */
  const players = new Map();
  /**
   * @type {Map<number, Player>}
   */
  const playersByClientIds = new Map();

  /**
   * @param {number} clientId
   * @param {Player} player
   * @return {GameScene}
   */
  this.addPlayer = (clientId, player) => {
    player.placeableObjectInterface.setScene(this);
    if (!player.hashableIdInterface.getHashId()) {
      player.hashableIdInterface.calculateHashId();
    }
    objects.set(player.hashableIdInterface.getHashId(), player);
    players.set(player.hashableIdInterface.getHashId(), player);
    playersByClientIds.set(clientId, player);
    return this;
  };

  /**
   * @param hashId
   * @returns {Player|undefined}
   */
  this.getPlayer = hashId => players.get(hashId);

  /**
   * @return {IterableIterator<Player>}
   */
  this.getAllPlayers = () => players.values();

  /**
   * @param {number} clientId
   * @return {Player|undefined}
   */
  this.getPlayerByClientId = clientId => playersByClientIds.get(clientId);

  /**
   * @return {IterableIterator<[number, Player]>}
   */
  this.getAllPlayersWithClientIds = () => playersByClientIds.entries();

  /**
   * @param hashId
   */
  this.removePlayer = (hashId) => {
    objects.delete(hashId);
    players.delete(hashId);
  };

  this.removePlayerByClientId = (clientId) => {
    const player = playersByClientIds.get(clientId);
    if (player) {
      const hashId = player.hashableIdInterface.getHashId();
      objects.delete(hashId);
      players.delete(hashId);
      playersByClientIds.delete(clientId);
    }
  };
}

export default GameScene;

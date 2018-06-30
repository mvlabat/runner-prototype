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

  const players = new Map();
  this.addPlayer = (player) => {
    console.log(`hmm ${player.hashableIdInterface.getHashId()}`);
    player.placeableObjectInterface.setScene(this);
    if (!player.hashableIdInterface.getHashId()) {
      player.hashableIdInterface.calculateHashId();
    }
    objects.set(player.hashableIdInterface.getHashId(), player);
    players.set(player.hashableIdInterface.getHashId(), player);
    return this;
  };
  /**
   * @param hashId
   * @returns {Player|undefined}
   */
  this.getPlayer = hashId => players.get(hashId);
  this.getAllPlayers = () => players.values();
  this.removePlayer = (hashId) => {
    objects.delete(hashId);
    players.delete(hashId);
  };
}

export default GameScene;

import HashableIdInterface from '../Interfaces/HashableIdInterface';

function GameScene() {
  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, '', {});

  // CLASSES IMPLEMENTATION.
  const objects = new Map();
  this.addObject = (object) => {
    objects.set(object.hashableIdInterface.getHashId(), object);
    return this;
  };
  this.getObject = hashId => objects.get(hashId);
  this.hasObject = hashId => objects.has(hashId);
  this.getAllObjects = () => objects.values();
  this.removeObject = hashId => objects.delete(hashId);

  const players = new Map();
  this.addPlayer = (player) => {
    players.set(player.hashableIdInterface.getHashId(), player);
    return this;
  };
  this.getPlayer = hashId => players.get(hashId);
  this.getAllPlayers = () => players.values();
  this.removePlayer = hashId => players.delete(hashId);
}

export default GameScene;

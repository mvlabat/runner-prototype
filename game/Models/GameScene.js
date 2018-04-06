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
  this.getAllObjects = () => objects.values();

  const players = new Map();
  this.addObject = (player) => {
    players.set(player.hashableIdInterface.getHashId(), player);
    return this;
  };
  this.getObject = hashId => players.get(hashId);
  this.getAllObjects = () => players.values();
}

export default GameScene;

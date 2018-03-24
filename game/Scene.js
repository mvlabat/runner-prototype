import HashableIdInterface from './Interfaces/HashableIdInterface';

function Scene() {
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
}

export default Scene;

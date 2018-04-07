/**
 * @param {GameScene} scene
 * @constructor
 */
function SceneObjectManager(scene) {
  this.addObject = (object) => {
    object.placableObjectInterface
      .setScene(scene)
      .calculateHashId();
    scene.addObject(object);
  };
  this.getObject = hashId => scene.getObject(hashId);
  this.getAllObjects = () => scene.getAllObjects();
  this.removeObject = hashId => scene.removeObject(hashId);

  this.addPlayer = (player) => {
    player.placableObjectInterface
      .setScene(scene)
      .calculateHashId();
    scene.addPlayer(player);
  };
  this.getPlayer = hashId => scene.getPlayer(hashId);
  this.getAllPlayers = () => scene.getAllPlayers();
  this.removePlayer = hashId => scene.removePlayer(hashId);
}

export default SceneObjectManager;

/**
 * Readonly interface for accessing game scene state.
 *
 * @param {GameScene} gameScene
 * @constructor
 */
function GameState(gameScene) {
  this.getAllObjects = () => gameScene.getAllObjects();
  this.getObject = hashId => gameScene.getObject(hashId);
  this.hasObject = hashId => gameScene.hasObject(hashId);

  this.getBuildableObject = hashId => gameScene.getBuildableObject(hashId);
  this.hasBuildableObject = hashId => gameScene.hasBuildableObject(hashId);
  this.getAllBuildableObjects = () => gameScene.getAllBuildableObjects();

  this.getPlayer = hashId => gameScene.getPlayer(hashId);
  this.getAllPlayers = () => gameScene.getAllPlayers();
  this.getAllPlayersWithClientIds = () => gameScene.getAllPlayersWithClientIds();
}

export default GameState;

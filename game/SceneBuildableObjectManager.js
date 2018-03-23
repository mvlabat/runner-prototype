/**
 * @param {Scene} scene
 * @constructor
 */
function SceneBuildableObjectManager(scene) {
  this.addObject = (object) => {
    object.buildableObjectInterface
      .setScene(scene)
      .calculateHashId();
    scene.addObject(object);
  };

  this.getAllObjects = () => scene.getAllObjects();
}

export default SceneBuildableObjectManager;

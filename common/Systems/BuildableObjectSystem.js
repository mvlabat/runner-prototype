/**
 * @param {GameScene} gameScene
 * @constructor
 */
import ActionProcessorInterface from '../Interfaces/ActionProcessorInterface';
import SaveBuildableObjectAction from '../Actions/SaveBuildableObjectAction';
import RemoveBuildableObjectAction from '../Actions/RemoveBuildableObjectAction';

/**
 * @param {GameScene} gameScene
 * @constructor
 */
function BuildableObjectSystem(gameScene) {
  const actionProcessors = new Map([
    [SaveBuildableObjectAction, saveBuildableObject],
    [RemoveBuildableObjectAction, removeBuildableObject],
  ]);

  this.actionProcessorInterface = new ActionProcessorInterface(this, {
    canProcess: actionClass => actionProcessors.has(actionClass),

    processAction: action => actionProcessors.get(action.constructor)(action),
  });

  /**
   * @param {SaveBuildableObjectAction} action
   */
  function saveBuildableObject(action) {
    const buildableObject = action.getBuildableObject();
    const existingBuildableObject =
      gameScene.getBuildableObject(buildableObject.hashableIdInterface.getHashId());
    if (existingBuildableObject) {
      existingBuildableObject.savableInterface.save(buildableObject);
    } else {
      gameScene.addBuildableObject(buildableObject);
    }
  }

  /**
   * @param {RemoveBuildableObjectAction} action
   */
  function removeBuildableObject(action) {
    gameScene.removeBuildableObject(action.getBuildableObjectHashId());
  }
}

export default BuildableObjectSystem;

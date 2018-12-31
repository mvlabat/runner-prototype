import RustCommon from '../../rust_common/Cargo.toml';

import SystemInterface from '../Interfaces/SystemInterface';
import SaveBuildableObjectAction from '../Actions/SaveBuildableObjectAction';
import RemoveBuildableObjectAction from '../Actions/RemoveBuildableObjectAction';
import { replaying } from '../Utils/SystemHelpers';

/**
 * @param {GameScene} gameScene
 * @param {PlayerModel} playerModel
 * @constructor
 */
function BuildableObjectSystem(gameScene, playerModel) {
  const actionProcessors = new Map([
    [SaveBuildableObjectAction, saveBuildableObject],
    [RemoveBuildableObjectAction, removeBuildableObject],
  ]);

  this.systemInterface = new SystemInterface(this, {
    canProcess: action => actionProcessors.has(action.constructor),

    process: action => actionProcessors.get(action.constructor)(action),
  });

  /**
   * @param {SaveBuildableObjectAction} action
   */
  function saveBuildableObject(action) {
    if (replaying(action, playerModel)) {
      return;
    }

    const buildableObject = action.getBuildableObject();
    const existingBuildableObject =
      gameScene.getBuildableObject(buildableObject.hashableIdInterface.getHashId());
    if (existingBuildableObject) {
      const isJustAdded = existingBuildableObject.placeableObjectInterface.isPlaced()
        !== buildableObject.placeableObjectInterface.isPlaced();
      if (isJustAdded && buildableObject.placeableObjectInterface.isPlaced()) {
        RustCommon.addBuildableObject(buildableObject);
      }
      existingBuildableObject.savableInterface.save(buildableObject);
    } else {
      gameScene.addBuildableObject(buildableObject);
      if (buildableObject.placeableObjectInterface.isPlaced()) {
        RustCommon.addBuildableObject(buildableObject);
      }
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

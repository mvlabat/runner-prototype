import BuildableObjectsTypeMap from '../Utils/BuildableObjectsTypeMap';

/**
 * @param {SceneBuildableObjectManager} sceneObjectManager
 * @constructor
 */
function NetworkController(sceneObjectManager) {
  const websocket = new WebSocket('ws://localhost:9292');

  this.update = () => {};

  this.sendAddObjectMessage = (object) => {
    websocket.send(JSON.stringify({
      messageType: 'addObject',
      payload: {
        objectType: object.buildableObjectInterface.getType(),
        object: object.constructor.serializableInterface.serialize(object),
      },
    }));
  };

  websocket.addEventListener('open', (event) => {
    console.log(event);
  });

  websocket.addEventListener('message', (event) => {
    const json = JSON.parse(event.data);
    if (json.messageType === 'addObject') {
      const objectClass = BuildableObjectsTypeMap.getObjectClass(json.payload.objectType);
      if (objectClass) {
        const object = objectClass.serializableInterface.deserialize(json.payload.object);
        sceneObjectManager.addObject(object);
      } else {
        console.warn(`Unknown received object type: ${json.payload.objectType}`);
      }
    } else {
      console.warn(`Unknown received message type: ${json.messageType}`);
    }
  });
}

export default NetworkController;

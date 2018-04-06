import UpdatableInterface from '../Interfaces/UpdatableInterface';

function NetworkController() {
  this.updatableInterface = new UpdatableInterface(this, {
    update: (_timeDelta) => {},
  });
}

export default NetworkController;

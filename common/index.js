import Engine from './Engine';

// This is an ugly hack for executing init code of modules on server.
require('./PlaceableObjects/Circle');
require('./PlaceableObjects/Rectangle');
require('./PlaceableObjects/Player');

export default Engine;

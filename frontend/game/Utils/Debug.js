import Game from '../Game';

// eslint-disable-next-line import/prefer-default-export
export function setDebugProperty(entity, property, value) {
  /* eslint-disable no-param-reassign, no-underscore-dangle */
  if (Game.config.debugIsEnabled()) {
    if (!entity._debug) {
      entity._debug = {};
    }
    entity._debug[property] = value;
  }
}

export function log(message) {
  if (Game.config.debugIsEnabled()) {
    console.log(message);
  }
}

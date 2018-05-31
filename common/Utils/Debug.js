// eslint-disable-next-line import/prefer-default-export
import Engine from '../Engine';

export function setDebugProperty(entity, property, value) {
  /* eslint-disable no-param-reassign, no-underscore-dangle */
  if (Engine.config.debugIsEnabled()) {
    if (!entity._debug) {
      entity._debug = {};
    }
    entity._debug[property] = value;
  }
}

export function log(message) {
  if (Engine.config.debugIsEnabled()) {
    console.log(message);
  }
}

export function serverLog(message) {
  if (Engine.config.isServer()) {
    log(message);
  }
}

export function clientLog(message) {
  if (Engine.config.isClient()) {
    log(message);
  }
}

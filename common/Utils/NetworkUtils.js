/* eslint-disable import/prefer-default-export */

import { serialize } from './JsonSerializationHelper';
import { log } from './Debug';

export function send(ws, message) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(serialize(message)));
  } else {
    log('Tried to send a message via a socket that was not OPEN');
  }
}

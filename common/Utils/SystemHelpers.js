/* eslint-disable import/prefer-default-export */

import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';

/**
 * @param action
 * @param {PlayerModel} player
 * @returns {boolean}
 */
export function replaying(action, player) {
  BroadcastedActionInterface.assert(action);
  const senderId = action.broadcastedActionInterface.getSenderId();
  return senderId !== null && senderId === player.clientId;
}

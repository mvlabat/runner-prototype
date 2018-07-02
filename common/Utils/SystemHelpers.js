/* eslint-disable import/prefer-default-export */

import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';

/**
 * @param action
 * @param {PlayerModel} playerModel
 * @returns {boolean}
 */
export function replaying(action, playerModel) {
  BroadcastedActionInterface.assert(action);
  const senderId = action.broadcastedActionInterface.getSenderId();
  return senderId !== null && senderId === playerModel.playerId;
}

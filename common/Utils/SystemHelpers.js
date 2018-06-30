/* eslint-disable import/prefer-default-export */

import { assertInterface } from './InterfaceImplementation';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';

/**
 * @param action
 * @param {PlayerModel} playerModel
 * @returns {boolean}
 */
export function replaying(action, playerModel) {
  assertInterface(action, BroadcastedActionInterface);
  const senderId = action.broadcastedActionInterface.getSenderId();
  return senderId !== null && senderId === playerModel.playerId;
}

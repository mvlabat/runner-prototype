import SystemInterface from 'common/Interfaces/SystemInterface';
import PongMessage from 'common/NetworkMessages/PongMessage';
import ActivePlayersRegistry from 'common/Registries/ActivePlayersRegistry';
import { log } from 'common/Utils/Debug';
import UpdatableInterface from 'common/Interfaces/UpdatableInterface';
import PingMessage from 'common/NetworkMessages/PingMessage';
import { send } from 'common/Utils/NetworkUtils';
import DespawnClientPlayersAction from 'common/Actions/DespawnClientPlayersAction';

import ClientsRegistry from '../Registries/ClientsRegistries';

/**
 * @param {ActionController} actionController
 * @constructor
 */
function ServerNetworkMessageSystem(actionController) {
  const messageProcessors = new Map([
    [PongMessage, processPongMessage],
  ]);

  const CONNECTION_TIMEOUT = 30000;
  const PING_INTERVAL = 1000;

  /**
   * This map stores dates of last ping messages by players id.
   * It preserves last message date even if pong response has been received.
   * It does not contain a date for a player has just connected.
   *
   * @type {Map<number, Date>}
   */
  const lastPingMessageDates = new Map();

  /**
   * This map stores ping messages by Ping ID.
   * It preserves only those messages that have not been responded with a pong message.
   *
   * @type {Map<number, PingMessage>}
   */
  const pingMessagesById = new Map();

  /**
   * This map stores ping messages by Client ID.
   * It preserves only those messages that have not been responded with a pong message.
   *
   * @type {Map<number, PingMessage>}
   */
  const pingMessagesByClientId = new Map();

  let pingIdCounter = 0;

  this.updatableInterface = new UpdatableInterface(this, {
    /**
     * Send ping messages and close sockets that do not respond.
     */
    update: (_timeDelta) => {
      const now = new Date();
      for (const player of ActivePlayersRegistry.getAllPlayers()) {
        const ws = ClientsRegistry.getSocketByClientId(player.clientId);
        if (ws.readyState === ws.CLOSED) {
          dropPlayer(player);
          continue;
        }

        const lastPingMessageDate = lastPingMessageDates.get(player.clientId);

        const hasNoPingMessageSent = !lastPingMessageDate;
        const isAwaitingPongMessage = pingMessagesByClientId.has(player.clientId);
        const isTimeToSendAnotherPing = !hasNoPingMessageSent
          && !isAwaitingPongMessage
          && now - lastPingMessageDate > PING_INTERVAL;

        if (hasNoPingMessageSent || isTimeToSendAnotherPing) {
          sendPingMessage(now, player);
        } else if (now - lastPingMessageDate > CONNECTION_TIMEOUT) {
          dropPlayer(player);
          log(`Connection with Player (${player.clientId}) has been dropped (timeout)`);
        }
      }
    },
  });

  this.systemInterface = new SystemInterface(this, {
    canProcess: message => messageProcessors.has(message.constructor),

    process: message => messageProcessors.get(message.constructor)(message),
  });

  /**
   * @param {PongMessage} message
   */
  function processPongMessage(message) {
    const now = new Date();
    const clientId = message.networkMessageInterface.getSenderId();
    const player = ActivePlayersRegistry.getPlayerById(clientId);
    if (!player) {
      log(`There is no active player with such id: ${clientId}`);
      return;
    }
    const lastPingMessageDate = lastPingMessageDates.get(clientId);
    if (!lastPingMessageDate) {
      log(`Ping message has never been sent to the player with such id: (${clientId}`);
      return;
    }

    player.latency = now - lastPingMessageDate;
    pingMessagesByClientId.delete(player.clientId);
    pingMessagesById.delete(message.getPingId());
    log(`Player (${player.clientId}) latency: ${player.latency}`);
  }

  /**
   * @param {Date} now
   * @param {PlayerModel} player
   * @return PingMessage
   */
  function sendPingMessage(now, player) {
    lastPingMessageDates.set(player.clientId, now);
    const pingMessage = new PingMessage(pingIdCounter, player.latency);
    pingMessagesById.set(pingMessage.getPingId(), pingMessage);
    pingMessagesByClientId.set(player.clientId, pingMessage);
    pingIdCounter += 1;

    const ws = ClientsRegistry.getSocketByClientId(player.clientId);
    send(ws, pingMessage);
  }

  /**
   * @param {PlayerModel} player
   */
  function dropPlayer(player) {
    // Firstly we emit close signal for ws (NetworkController), after that, on next network tick,
    // we can clean up the player.
    const ws = ClientsRegistry.getSocketByClientId(player.clientId);
    if (ws.readyState === ws.OPEN) {
      ws.terminate();
      return;
    }

    const pingMessage = pingMessagesByClientId.get(player.clientId);
    if (pingMessage) {
      pingMessagesById.delete(pingMessage.getPingId());
      pingMessagesByClientId.delete(player.clientId);
    }

    ClientsRegistry.removeClientWithId(player.clientId);
    actionController.addAction(new DespawnClientPlayersAction(player.clientId, 0, -1));
  }
}

export default ServerNetworkMessageSystem;

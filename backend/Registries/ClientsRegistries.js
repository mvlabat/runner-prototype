import ActivePlayersRegistry from 'common/Registries/ActivePlayersRegistry';

/**
 * @constructor
 */
const ClientsRegistry = (() => {
  /**
   * @type {Map<number, WebSocket>}
   */
  const socketsByClientId = new Map();
  /**
   * @type {Map<WebSocket, number>}
   */
  const clientIdsBySocket = new Map();

  return {
    /**
     * Registers a player both for this registry and ActivePlayersRegistry.
     *
     * @param {PlayerModel} player
     * @param {WebSocket} ws
     */
    registerClient: (player, ws) => {
      socketsByClientId.set(player.clientId, ws);
      clientIdsBySocket.set(ws, player.clientId);
      ActivePlayersRegistry.registerPlayer(player);
    },

    /**
     * @return {IterableIterator<WebSocket>}
     */
    getAllSockets: () => socketsByClientId.values(),

    /**
     * @param {number} clientId
     * @return {WebSocket}
     */
    getSocketByClientId: clientId => socketsByClientId.get(clientId),

    /**
     * @param clientId
     * @return {boolean}
     */
    hasSocketWithClientId: clientId => socketsByClientId.has(clientId),

    /**
     * @param ws
     * @return {PlayerModel}
     */
    getPlayerBySocket: (ws) => {
      const playerId = clientIdsBySocket.get(ws);
      return ActivePlayersRegistry.getPlayerById(playerId);
    },

    /**
     * Removes a player both from this registry and ActivePlayersRegistry.
     *
     * @param {number} clientId
     */
    removeClientWithId: (clientId) => {
      const ws = socketsByClientId.get(clientId);
      clientIdsBySocket.delete(ws);
      socketsByClientId.delete(clientId);
      // We do not remove player from ActivePlayersRegistry yet,
      // as we need to process DespawnClientPlayerAction. PlayerSystem will take care of it.
    },
  };
})();

export default ClientsRegistry;

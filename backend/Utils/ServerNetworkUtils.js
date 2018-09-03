import { send } from 'common/Utils/NetworkUtils';

import ClientsRegistry from '../Registries/ClientsRegistries';

export function broadcastToOthers(currentPlayerSocket, message) {
  for (const ws of ClientsRegistry.getAllSockets()) {
    const player = ClientsRegistry.getPlayerBySocket(ws);
    if (ws !== currentPlayerSocket && player.authenticated) {
      send(ws, message);
    }
  }
}

export function broadcastToEveryone(message) {
  for (const ws of ClientsRegistry.getAllSockets()) {
    const player = ClientsRegistry.getPlayerBySocket(ws);
    if (player.authenticated) {
      send(ws, message);
    }
  }
}

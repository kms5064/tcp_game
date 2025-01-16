export const packetNames = {
  common: {
    CommonPacket: 'common.CommonPacket',
    Ping: 'common.Ping',
  },
  initial: {
    InitialPayload: 'initial.InitialPayload',
  },
  game: {
    CreateGamePayload: 'game.CreateGamePayload',
    JoinGamePayload: 'game.JoinGamePayload',
    LocationUpdatePayload: 'game.LocationUpdatePayload',
  },
  response: {
    Response: 'response.Response',
  },
  gameNotification: {
    LocationUpdate: 'gameNotification.LocationUpdate',
    Start: 'gameNotification.Start',
  },
};
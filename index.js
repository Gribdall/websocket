import { WebSocketServer } from "ws"

const PORT = parseInt(process.env.PORT) || process.argv[3] || 8080;

const websocket = new WebSocketServer({port: PORT})

websocket.on('connection', (ws) => {
  console.log('A new client has connected.')

  websocket.on('message', (message) => {
    console.log(`Received: ${message}`)

    websocket.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    })
  })

  websocket.on('close', () => {
    console.log('A client has disconnected.')
  })
})
module.exports = function (app) {
  const WebSocket = require('ws');
  const Chat = require('../../models/chat');
  const clients = [];

  const wss = new WebSocket.Server({ port: 3002 });

  wss.on('connection', function connection(socket) {
    socket.on('message', function incoming(message) {
      const data = JSON.parse(message);
      console.log('data', data);
      switch (data.type) {
        case 'connect': {
          console.log('Connecting ' + data.userId);
          clients.push({
            socket,
            ...data,
          });

          break;
        }

        case 'say': {
          const { sender, recipient, text } = data;

          Chat.create({
            recipient,
            sender,
            text,
          });

          clients
            .filter((c) => {
              return (
                c.userId === data.recipient ||
                c.userId === data.sender
              );
            })
            .forEach((client) =>
              client.socket.send(
                JSON.stringify({
                  type: 'say',
                  ...data,
                }),
              ),
            );
          break;
        }
      }
    });

    socket.on('close', function close() {
      const client = clients.find((c) => c.userId === socket.userId);
      if (!client) return;
      console.log('Closing ' + client.userId);
      clients.splice(clients.indexOf(client), 1);
    });
  });
};

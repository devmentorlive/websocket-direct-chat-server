module.exports = function (app) {
  const WebSocket = require('ws');
  const clients = [];

  const wss = new WebSocket.Server({ port: 3002 });

  wss.on('connection', function connection(socket) {
    socket.on('message', function incoming(message) {
      const data = JSON.parse(message);
      console.dir(data);

      switch (data.type) {
        case 'connect': {
          console.log('Connecting ' + data.user);
          clients.push({
            socket,
            ...data,
          });

          break;
        }

        case 'say': {
          clients
            .filter((c) => {
              return (
                c.user === data.recipient || c.user === data.sender
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
      const client = clients.find((c) => c.user === socket.user);
      if (!client) return;
      console.log('Closing ' + client.user);
      clients.splice(clients.indexOf(client), 1);
    });
  });
};

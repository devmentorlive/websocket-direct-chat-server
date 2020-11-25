module.exports = function (app) {
  const Chat = require('../../models/chat');
  app.get('/chats/:user1/:user2/:limit?', function (req, res) {
    console.dir(req.params);
    Chat.find({
      $or: [
        { sender: req.params.user1, recipient: req.params.user2 },
        { sender: req.params.user2, recipient: req.params.user1 },
      ],
    }).then((chats) => {
      res.status(200).json(
        chats.map((chat) => ({
          sender: chat.sender,
          recipient: chat.recipient,
          text: chat.text,
        })),
      );
    });
  });
};

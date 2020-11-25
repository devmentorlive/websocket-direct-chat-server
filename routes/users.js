module.exports = function (app) {
  const User = require('../models/user');
  app.get('/users/:id', function (req, res) {
    User.findById(req.params.id).then((user) => {
      res.status(200).json(user);
    });
  });
};

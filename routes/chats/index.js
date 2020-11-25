module.exports = function (app) {
  require('./rest')(app);
  require('./socket')(app);
};

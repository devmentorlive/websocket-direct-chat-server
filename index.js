const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/webchat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || '3001';

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.set('port', port);
server.listen(port);

require('./routes/chats')(app);
require('./routes/users')(app);
module.exports = app;

const express = require('express');
const logger = require('morgan');
const app = express();
const http = require('http');
const server = http.createServer(app);

const port = process.env.PORT || '3001';

app.use(logger('dev'));
app.use(express.json());
app.set('port', port);
server.listen(port);

require('./routes/chats')(app);
module.exports = app;

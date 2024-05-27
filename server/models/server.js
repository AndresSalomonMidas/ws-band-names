const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // Http server
    this.server = http.createServer(this.app);

    // Socket config
    this.io = socketIo(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    
    // CORS
    this.app.use(cors());
  }

  socketConfig () {
    const socket = new Sockets(this.io);

    socket.socketsEvents();
  }

  execute () {
    // Init middlewares
    this.middlewares();

    // Init sockets
    this.socketConfig();

    // Init server
    this.server.listen(this.port, () => {
      console.log('Server listening on port: ' + this.port);
    });
  }
}

module.exports = Server;

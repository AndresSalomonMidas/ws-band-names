const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
  }

  socketsEvents() {
    // Argument socket is like the client connected to the server
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      // SOCKET EVENTS
      // 1. Emit current list of bands to client
      socket.emit('current-bands', this.bandList.getBands());

      // 2. Vote band
      socket.on('vote-band', (id) => {
        this.bandList.increaseVotes(id);
        // Emit current list of bands to all clients after increase vote
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // 3. Delete band
      socket.on('delete-band', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // 4. Change band name
      socket.on('change-band-name', ({ id, name }) => {
        this.bandList.changeName(id, name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // 5. Add new band
      socket.on('add-band', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;

const socketIO = require("socket.io");

class SocketServer {
  constructor(server) {
    this.io = socketIO(server, {
      cors: {
        origin: "*",
      },
    });
    this.io.on("connection", this.handleConnection);
  }

  handleConnection(socket) {
    console.log("New client connected");

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }
  // Method to emit a message to all connected clients
  emitMessage(data) {
    this.io.emit("message", data);
  }
}

module.exports = SocketServer;

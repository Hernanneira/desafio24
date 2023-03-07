
const mensajeController = require('../../controllers/ContenedorMensajes.js');
const { normalizeAll } = require('../../utils/normalize');

async function handleSendMessages () {
    try {
      const messages = await mensajeController.getAll();
      return normalizeAll(messages)
    } catch (error) {
      console.error(error.message)
      return []
    }
}

async function configureSocketMessage(socket, sockets) {
  socket.emit("messages", await handleSendMessages());

  socket.on("messegesNew", async (message) => {
    message.date = new Date();
    
    await mensajeController.save(message);
    sockets.emit("messages", await handleSendMessages());
  });

}

module.exports = { configureSocketMessage };

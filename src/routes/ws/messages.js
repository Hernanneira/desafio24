
const messagesDAO = require('../../DAO/messagesDAO.js');
const UsersDAO = require('../../DAO/usersDAO')
const { normalizeAll } = require('../../utils/normalize');

async function handleSendMessages () {
    try {
      const messages = await messagesDAO.getAll();
      return normalizeAll(messages)
    } catch (error) {
      console.error(error.message)
      return []
    }
}

async function configureSocketMessage(socket, sockets) {
  socket.emit("messages", await handleSendMessages());

  socket.on("messegesNew", async (message) => {

    // const usarName = UsersDAO.getUser(message.nombre)

    message.date = new Date().toLocaleString();
    console.log(message)
    await messagesDAO.save(message);
    sockets.emit("messages", await handleSendMessages());
  });

}

module.exports = { configureSocketMessage };

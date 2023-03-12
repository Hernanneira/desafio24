const cartProductosDAO = require('../../DAO/cartProductosDAO');

async function handleSendCart (user) {
    try {
        const productos = await cartProductosDAO.getCart(user);
      return productos
    } catch (error) {
      console.error(error.productos)
      return []
    }
}

async function configureSocketCart(socket, sockets) {

  socket.on("user", async (user) => {
    socket.emit("cart", await handleSendCart(user));
  })
  
  socket.on("renderCart", async (user, cart) => {
    if(cart.length == 0) {
      await cartProductosDAO.deleteAll(user)
      sockets.emit("cart", await handleSendCart(user));
    } else {
      const newCart = await cartProductosDAO.update(user, cart);
      console.log('newCart',newCart)
      sockets.emit("cart", await handleSendCart(user));
    }
  });
}

module.exports = { configureSocketCart };
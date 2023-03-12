
const productosDAO = require('../../DAO/productsDAO');

async function handleSendProducts () {
    try {
        const productos = await productosDAO.getAll();
      return productos
    } catch (error) {
      console.error(error.productos)
      return []
    }
}

async function configureSocketProducts(socket, sockets) {
  socket.emit("productos", await handleSendProducts());

  socket.on("guardarNuevoProducto", async (nuevoProducto) => {

    const newProducto = await productosDAO.save(nuevoProducto);
    console.log(newProducto)
    sockets.emit("productos", await handleSendProducts());
  });

}

module.exports = { configureSocketProducts };
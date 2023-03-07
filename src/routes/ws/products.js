
const productosController = require('../../controllers/ContenedorProductos');

async function handleSendProducts () {
    try {
        const productos = await productosController.getAll();
      return productos
    } catch (error) {
      console.error(error.productos)
      return []
    }
}

async function configureSocketProducts(socket, sockets) {
  socket.emit("productos", await handleSendProducts());

  socket.on("guardarNuevoProducto", async (nuevoProducto) => {

    const newProducto = await productosController.save(nuevoProducto);
    console.log(newProducto)
    sockets.emit("productos", await handleSendProducts());
  });

}

module.exports = { configureSocketProducts };
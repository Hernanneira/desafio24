const express = require('express');
const { faker } = require('@faker-js/faker') 
const mensajeController = require('./controllers/ContenedorMensajes.js')
const productosController = require('./controllers/ContenedorProductos.js')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { normalize, schema, denormalize} = require('normalizr');
const dotenv = require('dotenv');
const parseArgs = require('minimist');
const cluster = require('cluster');
const os = require('os')
const router = require('./routes/index')
const path = require('path');


const args = parseArgs(process.argv.slice(2));
const app = express();
faker.locale = 'es'
dotenv.config();
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// const mongoURlString = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@clustercoder.rrnnvzr.mongodb.net/?retryWrites=true&w=majority`
const PORT = args.port || 8080;
// const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = args.modo == 'CLUSTER'
// const modoCluster = process.argv[3] == 'CLUSTER';
const numCPUs = os.cpus().length;


const httpServer = new createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './public/views/pages'));

app.use(express.static('public'))

// webSocket

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  //User
  socket.on("loginUsuario", (logUser) => {
    socket.emit("user", logUser);
  });

  //productos
  const productos = await productosController.getAll();
  socket.emit("productos", productos);

  socket.on("guardarNuevoProducto", async (nuevoProducto) => {
    const newProducto = await productosController.save(nuevoProducto);
    io.sockets.emit("productos", newProducto);
  });

  //Normalizr
  function normalizeAll(getAllMessages) {
    const newGetAllMessages = getAllMessages.map((e) => {
      const allMessagesObject = {
        author: e.author,
        date: e.date,
        text: e.text,
      };
      return allMessagesObject;
    });
    const chatOriginal = {
      id: "mensajes",
      mensajes: newGetAllMessages,
    };
    const schemaAuthor = new schema.Entity(
      "author",
      {},
      { idAttribute: "email" }
    );
    const schemaMensaje = new schema.Entity("text", { author: schemaAuthor });
    const schemaMensajes = new schema.Entity("posts", {
      mensajes: [schemaMensaje],
    });
    const normalizarMensajes = normalize(chatOriginal, schemaMensajes);
    const sinNorm = JSON.stringify(newGetAllMessages).length;
    const norm = JSON.stringify(normalizarMensajes).length;
    const porcentajeCompr = 100 - (norm * 100) / sinNorm;
    const chatDenormalized = denormalize(chatOriginal, normalizarMensajes);
    const compr = Math.round(porcentajeCompr * 100) / 100;
    return { chatDenormalized, compr };
  }
  // mensajes web socket
  const messages = await mensajeController.getAll();
  socket.emit("messages", normalizeAll(messages));

  socket.on("messegesNew", async (data) => {
    const newNormMessage = {
      author: {
        id: data.author.email,
        nombre: data.author.nombre,
        apellido: data.author.apellido,
        edad: data.author.edad,
        alias: data.author.alias,
        avatar: data.author.avatar,
      },
      date: new Date(),
      text: data.text,
    };
    const historialSave = await mensajeController.save(newNormMessage);
    io.sockets.emit("messages", normalizeAll(historialSave));
  });
});

//CRUD
app.use(router)
// app.use(authWebRouter)
// app.use(routerProducts)
// app.use(routerProcess)

//Server CLOUSETER OR FORK

// master
if (modoCluster && cluster.isPrimary) {

    console.log(`Primary ${process.pid} is running`);
    console.log(`número de procesadores: ${numCPUs}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
        cluster.fork();
    }); 
}
  // workers
else {
    const server = httpServer.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
})
    server.on('error', error => console.log(`Error en servidor ${error}`));
}


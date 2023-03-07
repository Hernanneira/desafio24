const { normalize, schema, denormalize} = require('normalizr');

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

module.exports = { normalizeAll }
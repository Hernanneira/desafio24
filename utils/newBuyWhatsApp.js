const dotenv = require('dotenv')
dotenv.config();
const twilio = require('twilio');

// node enviarSms.js +5491123456789 "Hola coder desde nodejs"

async function sendNewbuyWhatsApp (user, cartProducts ) {
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

let txt = ""
  cartProducts.forEach(iterarCarrito)
  function iterarCarrito(value, index, array) {
    txt += `id_articulo: ${value.id_articulo}\nArticulo: ${value.title} \nPrecio: ${value.price} \nFoto: ${value.thumbnail}`;
  };

const from = process.env.TWILIO_WHATSAPPPHONE_NUMBER;
const to = process.env.ADMIN_PHONE_NUMBER;
const body = `user:\n${user.username}\nemail:\n${user.email}\nProducts:\n${txt}`;
// const body = 'Hello, there!'
await client.messages.create({
  body, from, to })
  .then(message => console.log(message.sid));
}

module.exports = sendNewbuyWhatsApp
const dotenv = require('dotenv')
dotenv.config();
const twilio = require('twilio');

// node enviarSms.js +5491123456789 "Hola coder desde nodejs"

async function sendNewbuySMS (user, cartProducts ) {
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const from = process.env.TWILIO_PHONE_NUMBER;
const to = `+${user.telefono}`;
//Mejorar la vista del cartProducts
const body = `su pedido ha sido recibido y se encuentra en proceso. Articulo:${cartProducts}`;

const info = await client.messages.create({
  body, from, to });

console.log(info);  
}

module.exports = sendNewbuySMS
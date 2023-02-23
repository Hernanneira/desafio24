const dotenv = require('dotenv')
dotenv.config();
const twilio = require('twilio');

// node enviarSms.js +5491123456789 "Hola coder desde nodejs"

async function sendNewbuyWhatsApp (user, cartProducts ) {
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const from = process.env.TWILIO_WHATSAPPPHONE_NUMBER;
const to = process.env.ADMIN_PHONE_NUMBER;
//Mejorar la vista del cartProducts.toString()
const body = `user: ${user.username} email: ${user.email}, Products:${cartProducts.toString()} `;

await client.messages.create({
  body, from, to })
  .then(message => console.log(message.sid));
}

module.exports = sendNewbuyWhatsApp
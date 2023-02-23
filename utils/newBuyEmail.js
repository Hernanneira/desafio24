const dotenv = require('dotenv')
dotenv.config();

const nodemailer = require("nodemailer");

 function sendNewBuyEmail(user, cartProducts) {

  if(cartProducts) {

    let transporter = nodemailer.createTransport({
      host: process.env.ETHEREAL_HOST,
      port: process.env.ETHEREAL_PORT,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });
  
    let txt = ""
      cartProducts.forEach(iterarCarrito)
      function iterarCarrito(value, index, array) {
        txt += `id_articulo: ${value.id_articulo}\nArticulo: ${value.title} \nPrecio: ${value.price} \nFoto: ${value.thumbnail}`;
      };

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: 'newRegister@app.email', // sender address
      to: "probando@algo.com", // list of receivers
      subject: `nuevo pedido de user: ${user.username} email: ${user.email} `, // Subject line
      text: ` Products:\n${txt}`,// plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}

module.exports = sendNewBuyEmail
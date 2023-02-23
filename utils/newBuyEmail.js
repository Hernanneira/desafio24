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
  
    // text: ` Products:${
    //   cartProducts.forEach(element => {`
    //     ${element.id_articulo}
    //     ${element.title}
    //     ${element.price}
    //     ${element.thumbnail}
    //     ${element.quantity} 
    //   `})
    // }`,

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: 'newRegister@app.email', // sender address
      to: "probando@algo.com", // list of receivers
      subject: `nuevo pedido de user: ${user.username} email: ${user.email} `, // Subject line
      //Mejorar la vista del cartProducts.toString()
      text: ` Products:${cartProducts.toString()}`,
      // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}

module.exports = sendNewBuyEmail
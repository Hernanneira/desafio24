const dotenv = require('dotenv')
dotenv.config();

const nodemailer = require("nodemailer");

 function sendNewRegisterEmail(user) {

  if(user) {

    console.log('NewUser:',user)
  
    let transporter = nodemailer.createTransport({
      host: process.env.ETHEREAL_HOST,
      port: process.env.ETHEREAL_PORT,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });
  
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: 'newRegister@app.email', // sender address
      to: "probando@algo.com", // list of receivers
      subject: "Nuevo registro", // Subject line
      text: `user: ${user.username} email: ${user.email} direccion: ${user.direccion}, edad: ${user.edad}, telefono: ${user.telefono}, foto: ${user.foto}`, // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}

module.exports = sendNewRegisterEmail
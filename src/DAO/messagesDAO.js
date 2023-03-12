const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');

console.log("db mongoose mensajes INICIADO")

const mongooseMessages = mongoose.createConnection(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_HOST}/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("db mongoose mensajes conectada")

class Mensaje {
        mensajessDAO = mongooseMessages.model('mensajes', require('../schemasModel/messagesSchema'));

    async getAll() {
        try {
            const content = await this.mensajessDAO.find({})
            return content
        } catch (error) {
            return(error)
        }
    }
    
    async save(newMessage) {
        try {
            await this.mensajessDAO.create(newMessage)
            }
        catch (error) {
            return(error)
        }
    }
}

const messagesDAO = new Mensaje()

module.exports = messagesDAO
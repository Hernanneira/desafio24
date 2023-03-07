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
    // async getById(id){
    //     console.log(id)
    //     try {
    //         this.connect()
    //         const content =  await this.productosDAO.find({id: id}) // usando mongo
    //         const elementosFiltrados = content.filter(e => e.id === id) //trabajandolo en paralelo
    //         this.disconnect()
    //         if(elementosFiltrados.length === 0){
    //             return({ error : 'producto no encontrado' })
    //         } else {
    //             return content
    //         }
    //     } catch (error) {
    //         console.log('estamos en error')
    //         return({error})
    //     }
    // }

    // async update(timestamp, nombre, descripcion, código, foto, precio, stock, id) {
    //     try{
    //         this.connect()
    //         const newProduct = {timestamp, nombre, descripcion, código, foto, precio, stock, id};
    //         const updateProduct = await this.productosDAO.updateMany({id: id}, {$set: newProduct})
    //         this.disconnect()
    //         return updateProduct ; //me devuelve un objeto raro pero lo actualiza.
    //     } catch (error) {
    //         return(error)
    //     }
    // }
    // async deleteAll(){
    //     try {
    //         this.connect()
    //         await this.productosDAO.deleteAll({})
    //         this.disconnect()
    //         return "eliminado con exito"
    //     } catch (error) {
    //         console.log(error)
    //         return "no pudo eliminarse"
    //     }
    // }

    // async deleteById (id) {
    //     try {
    //         this.connect()
    //         const elementosFiltrados = await this.productosDAO.deleteMany({id: id}) //me devuelve un objeto raro pero lo elimina.
    //         this.disconnect()
    //         return elementosFiltrados 
    //     } catch (error) {
    //         return(error)
    //     }
    // }
}

const mensajeController = new Mensaje()

module.exports = mensajeController
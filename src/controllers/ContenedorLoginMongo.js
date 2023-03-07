const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
console.log("db mongoose usuarios INICIADO")

const mongoseConnect = mongoose.createConnection(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_HOST}/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("db mongoose usuarios conectada")
        
class Users {
        UsersDAO = mongoseConnect.model('users', require('../schemasModel/usersSchema'))

    async getAll() {
        try {
            const content = await this.UsersDAO.find({})
            return content
        } catch (error) {
            return(error)
        }
    }
    
    async save(newUser) {
        try {
            await this.UsersDAO.create(newUser)
            const newContent = await this.UsersDAO.find({})
            return newContent
            }
        catch (error) {
            return(error)
        }
    }
    
    // async update( nombre, cart) {
    //     try{
    //         const updateProduct = await this.UsersDAO.updateOne({nombre: nombre}, {$set: {"cart": cart}})
    //         console.log(updateProduct)
    //         return this.getCart(nombre) ;
    //     } catch (error) {
    //         return(error)
    //     }
    // }


    // async getCart(nombre){
    //     try {

    //         const content =  await this.UsersDAO.find({nombre: nombre}) // usando mongo
    //         // console.log(content)
    //         if(content.cart == []){
    //             return({ error : 'producto no encontrado' })
    //         } else {
    //             return content
    //         }
    //     } catch (error) {
    //         console.log('estamos en error')
    //         return(error)
    //     }
    // }

    // async deleteAll(nombre){
    //     try {
    //         await this.UsersDAO.updateOne({nombre: nombre}, {$set: {"cart": []}})
    //         return this.getCart(nombre)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

//     async deleteById (id_articulo) {
//         try {
//             await this.connect()
//             const elementosFiltrados = await this.productosDAO.deleteMany({id_articulo: id_articulo}) //me devuelve un objeto raro pero lo elimina.
//             await this.disconnect()
//             return elementosFiltrados 
//         } catch (error) {
//             return(error)
//         }
//     }
}

const usersController = new Users()

module.exports = usersController
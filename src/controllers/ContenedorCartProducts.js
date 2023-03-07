const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');

console.log("db mongoose productos INICIADO")

const mongooseProductos = mongoose.createConnection(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_HOST}/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    });
    console.log("db mongoose productos conectada")


class Pruduct {
        cartProductosDAO = mongooseProductos.model('cartProductos', require('../schemasModel/cartSchema'));

    async createCart(cartUser) {
        try {
            const content = await this.cartProductosDAO.create(cartUser)
            return content
            }
        catch (error) {
            return(error)
        }
    }

    async getCart(user){
        try {
            const content =  await this.cartProductosDAO.find({"user": user})
            if(content.cart == []){
                return({ error : 'cart no encontrado' })
            } else {
                return content
            }
        } catch (error) {
            console.log('estamos en error')
            return(error)
        }
    }

    async update(user, cart) {
        try{
            const updateProduct = await this.cartProductosDAO.updateOne({"user": user}, {$set: {"cart": cart}})
            console.log(updateProduct)
            return this.getCart(user) ;
        } catch (error) {
            return(error)
        }
    }

     async deleteAll(user){
        try {
            await this.cartProductosDAO.deleteOne({"user": user})
            return []
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }

    // async getById(id_articulo){
    //     try {
    //         await this.connect()
    //         const content =  await this.productosDAO.find({id_articulo: id_articulo}) // usando mongo
    //         const elementosFiltrados = content.filter(e => e.id_articulo === id_articulo) //trabajandolo en paralelo
    //         await this.disconnect()
    //         if(elementosFiltrados.length === 0){
    //             return({ error : 'producto no encontrado' })
    //         } else {
    //             return content
    //         }
    //     } catch (error) {
    //         console.log('estamos en error')
    //         return(error)
    //     }
    // }

    // async update(timestamp, nombre, descripcion, código, foto, precio, stock, id_articulo) {
    //     try{
    //         await this.connect()
    //         const newProduct = {timestamp, nombre, descripcion, código, foto, precio, stock, id_articulo};
    //         const updateProduct = await this.productosDAO.updateMany({id_articulo: id_articulo}, {$set: newProduct})
    //         await this.disconnect()
    //         return updateProduct ; //me devuelve un objeto raro pero lo actualiza.
    //     } catch (error) {
    //         return(error)
    //     }
    // }
   

    // async deleteById (id_articulo) {
    //     try {
    //         await this.connect()
    //         const elementosFiltrados = await this.productosDAO.deleteMany({id_articulo: id_articulo}) //me devuelve un objeto raro pero lo elimina.
    //         await this.disconnect()
    //         return elementosFiltrados 
    //     } catch (error) {
    //         return(error)
    //     }
    // }
}

const cartProductosController = new Pruduct()

module.exports = cartProductosController
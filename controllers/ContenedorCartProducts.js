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
        cartProductosDAO = mongooseProductos.model('cartProductos', require('../schemasModel/productoSchema'));

    async getAll() {
        try {
            const content = await this.cartProductosDAO.find({})
            return content
        } catch (error) {
            return(error)
        }
    }
    
    async save(newArticulo) {
        try {
            const content = await this.cartProductosDAO.find({})
            let newId;
            if(content.length == 0){
                newId = 1;
            }else {
                newId = content.length + 1;
                console.log(newId)
            }
            const newObj = {
                title: newArticulo.title,
                price: newArticulo.price,
                thumbnail: newArticulo.thumbnail,
                id_articulo: newId
            }
            await this.cartProductosDAO.create(newObj)
            const newContent = await this.cartProductosDAO.find({})
            return newContent
            }
        catch (error) {
            return(error)
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
    // async deleteAll(){
    //     try {
    //         await this.connect()
    //         await this.productosDAO.deleteAll({})
    //         await this.disconnect()
    //         return "eliminado con exito"
    //     } catch (error) {
    //         console.log(error)
    //         return "no pudo eliminarse"
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
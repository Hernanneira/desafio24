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
        productosDAO = mongooseProductos.model('productos', require('../schemasModel/productoSchema'));

    async getAll() {
        try {
            const content = await this.productosDAO.find({})
            return content
        } catch (error) {
            return(error)
        }
    }
    
    async save(newArticulo) {
        try {
            const content = await this.productosDAO.find({})
            let newId;
            if(content.length == 0){
                newId = 1;
            }else {
                newId = content.length + 1;
                console.log(newId)
            }
            newArticulo.id_articulo = newId,
            newArticulo.quantity = 0
            const newContent = await this.productosDAO.create(newArticulo)
            return newContent
            }
        catch (error) {
            return(error)
        }
    }
}

const productosDAO = new Pruduct()

module.exports = productosDAO
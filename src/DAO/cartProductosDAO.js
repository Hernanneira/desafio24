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
            const cart = await this.getCart(cartUser.user)
            console.log(cart)
                if (cart.length !== 0) {
                    const content = this.update(cartUser.user, cartUser.cart)
                    return content
                }else {
                    const content = await this.cartProductosDAO.create(cartUser)
                    return content
                }
            }
        catch (error) {
            console.error(error);
            return false;
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
            await this.cartProductosDAO.updateOne({"user": user}, {$set: {"cart": cart}})
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
}

const cartProductosDAO = new Pruduct()

module.exports = cartProductosDAO
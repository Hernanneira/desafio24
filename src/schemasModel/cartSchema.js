const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartScheme = new Schema({
    user: { type: String, required: true },
    cart: [{
        id_articulo: { type: Number, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]
})

module.exports = cartScheme
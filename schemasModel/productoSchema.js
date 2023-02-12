const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductosScheme = new Schema({
    id_articulo: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true }
})

module.exports = ProductosScheme
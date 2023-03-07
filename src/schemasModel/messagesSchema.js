const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensajesScheme = new Schema({
    author: {
        type: Object,
        required: true
    },
    date: { 
        type: String, 
        required: true },
    text: {
        type: String,
        required: true
    }
})

module.exports = MensajesScheme;
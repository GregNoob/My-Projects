// Car part schema
const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    name: {type: String, required: true},
    partNumber: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String},
});

module.exports = mongoose.model('Part', Schema);
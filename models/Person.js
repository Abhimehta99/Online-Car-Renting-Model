const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true        
    },
    no: {
        type: Number,
        required: true
    },
    password1: {
        type: String,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
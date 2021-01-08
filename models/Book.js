const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name1: {
        type: String,
        required: true        
    },
    no: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        
        required: true
    },
    sdate: {
        type: String,
        default: new Date("<dd-mm-YYYY>"),
        required: true
    },
    edate: {
        type:String,
        default: new Date("<dd-mm-YYYY>"),
        required: true
    },
    stime: {
        type: String,
        default: new Date(),
        required: true
    },
    etime: {
        type: String,
        default: new Date(),
        required: true
    },
    cars: {
        type: String,
        required:true
    }
    
   
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
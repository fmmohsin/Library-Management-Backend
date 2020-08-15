var mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    bookName: String,
    author: String,
    availability: Boolean,
    isRequested: Boolean
})

module.exports = mongoose.model('Book', bookSchema);
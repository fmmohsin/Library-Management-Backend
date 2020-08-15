var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    contactNumber: String,
    password: String,
    isAdmin: Boolean,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
})

module.exports = mongoose.model('User', UserSchema);
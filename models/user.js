var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    contactNumber: String,
    password: String,
    isAdmin: Boolean
})

module.exports = mongoose.model('User', UserSchema);
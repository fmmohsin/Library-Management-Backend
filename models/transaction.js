var mongoose = require('mongoose');

let TransactionSchema = new mongoose.Schema({
    UserDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    BookDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    DueDate: String,
    TransactionType: String,
    isApproved: Boolean
})


module.exports = mongoose.model('Transaction', TransactionSchema);
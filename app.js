let app = require('express')();
let mongoose = require('mongoose');
let body_parser = require('body-parser');
let login = require('./router/login');
let book = require('./router/book');
let transaction = require('./router/transaction');
app.use(body_parser.json({}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://test:test12@ds217131.mlab.com:17131/admin1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(login);
app.use(book);
app.use(transaction);
// ##Books##



// let TransactionSchema = new mongoose.Schema({
//     UserDetail: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     BookDetail: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Book"
//     },
//     DueDate: String,
//     TransactionType: String
// })


// let Transaction = mongoose.model('Transaction', TransactionSchema);


app.listen('1234', () => console.log('started'))
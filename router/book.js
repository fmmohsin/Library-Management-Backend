let router = require('express').Router();
let Book = require('../models/book')
let Transaction = require('../models/transaction')

router.get('/book/:isAdmin', (req, res) => {
    // if()
    console.log(req.params.isAdmin);
    if (req.params.isAdmin === "true") {
        Book.find((err, books) => {
            if (err)
                res.send(err);
            else
                res.send(books);
        })
    } else {
        Book.find({ isRequested: false }, (err, books) => {
            if (err)
                res.send(err);
            else
                res.send(books);
        })
    }

});
router.post('/book/', (req, res) => {
    Book.create({...req.body, isRequested: false, availability: true }, (err, book) => {
        if (err)
            res.send(err);
        else
            res.send(book);
    })
});
router.delete('/book/:id', (req, res) => {
    let bookId = req.params.id;
    Transaction.find({ BookDetail: bookId }, (err, transactions) => {
        transactions.forEach((transaction) => {
            console.log("transaction" + transaction._id + '\n\n' + transaction)
            Transaction.findByIdAndDelete(transaction._id, () => {
                Book.findByIdAndDelete(bookId, function(err) {
                    if (err) console.log(err);
                    res.send({ _id: bookId });
                });
            })
        })
    })
});

module.exports = router;
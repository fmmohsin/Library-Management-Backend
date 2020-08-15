let router = require('express').Router();
let Transaction = require('../models/transaction')
let Book = require('../models/book')
let User = require('../models/user')

router.get('/transaction/', (req, res) => {
    Transaction.find().populate("UserDetail").populate("BookDetail").exec((err, transactions) => {
        if (err)
            res.send(err);
        else
            res.send(transactions);
    })
})

router.post('/transaction/request', (req, res) => {
    User.findOne({ _id: req.body.userid }, (err, user) => {
        if (err)
            res.send(err);
        else {
            Book.findOneAndUpdate({ _id: req.body.bookid }, { isRequested: true }, { new: true }, (err, book) => {
                if (err)
                    res.send(err);
                else {
                    Transaction.create({ UserDetail: user, BookDetail: book, DueDate: 'qwerty', TransactionType: 'Borrow', isApproved: false }, (err, transaction) => {
                        res.send(transaction);
                    })
                }
            })
        }
    })
});

router.put('/transaction/approve/:id', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }, (err, transaction) => {
        console.log(transaction);
        let updatedavailability = true;
        if (transaction.TransactionType === 'Borrow')
            updatedavailability = false;
        Book.findByIdAndUpdate(transaction.BookDetail, { availability: updatedavailability, isRequested: !updatedavailability }, { new: true }, (err, book) => {
            res.send(book);
        })

    })
})

module.exports = router;
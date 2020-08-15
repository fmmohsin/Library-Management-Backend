let router = require('express').Router();
const Book = require('../models/book')
const Transaction = require('../models/transaction')
const User = require('../models/user')


router.get('/book/:userid', (req, res) => {
    const userid = req.params.userid;
    User.findById(userid).populate("books").exec((err, user) => {
        if (user.isAdmin === true) {
            Book.find((err, books) => {
                if (err)
                    res.send(err);
                else
                    res.send(books);
            })
        } else {
            if (req.query.return) {
                res.send(user.books);
            } else {
                Book.find({ isRequested: false }, (err, books) => {
                    if (err)
                        res.send(err);
                    else
                        res.send(books);
                })
            }

        }
    })
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
let router = require('express').Router();
let Transaction = require('../models/transaction')
let Book = require('../models/book')
let User = require('../models/user')

router.get('/transaction/', (req, res) => {
    res.send(generateTransactions())
})

router.post('/transaction/create', (req, res) => {
    User.findOne({ _id: req.body.userid }).populate('books').exec((err, user) => {
        if (err)
            res.send(err);
        else {
            Book.findOneAndUpdate({ _id: req.body.bookid }, { isRequested: true }, { new: true }, (err, book) => {
                if (err)
                    res.send(err);
                else {
                    let transactionType;
                    if (req.body.return) {
                        transactionType = 'Return'
                        let books = user.books.filter((book) => { book._id !== req.body.bookid })
                        user.books = books;
                        user.save();
                    } else {
                        transactionType = 'Borrow'
                    }
                    Transaction.create({
                        UserDetail: user,
                        BookDetail: book,
                        DueDate: 'qwerty',
                        TransactionType: transactionType,
                        isApproved: false
                    }, (err, transaction) => {
                        res.send(transaction);
                    })
                }
            })
        }
    })
});
router.put('/transaction/approve/:id', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }, (err, transaction) => {
        let updatedavailability = true;
        if (transaction.TransactionType === 'Borrow') {
            updatedavailability = false;
            User.findById(transaction.UserDetail, (err, user) => {
                Book.findByIdAndUpdate(transaction.BookDetail, { availability: updatedavailability, isRequested: !updatedavailability }, { new: true }, (err, book) => {
                    user.books.push(book);
                    user.save();
                    res.send(generateTransactions());
                })
            })
        } else {
            Book.findByIdAndUpdate(transaction.BookDetail, { availability: updatedavailability, isRequested: !updatedavailability }, { new: true }, (err, book) => {
                res.send(generateTransactions());
            })
        }
    })
})

const generateTransactions = () => {
    Transaction.find({ isApproved: false }).populate("UserDetail").populate("BookDetail").exec((err, transactions) => {
        if (err)
            return err;
        else
            return transactions;
    })
}


module.exports = router;
let router = require('express').Router();
let User = require('../models/user');

router.post('/login/', (req, res) => {
    User.findOne({ username: req.body.userName }, (err, user) => {
        if (err)
            res.send(err);
        else {
            let postAuthDetails = {};
            if (user !== null && user !== undefined) {
                if (user.password === req.body.password) {
                    postAuthDetails.isLoggedIn = true;
                    postAuthDetails.isAdmin = user.isAdmin;
                    postAuthDetails.name = user.name;
                    postAuthDetails.id = user._id;
                } else {
                    postAuthDetails.isLoggedIn = false;
                }
            } else {
                postAuthDetails.isUser = false;
            }
            res.send(postAuthDetails);
        }

    })
});

module.exports = router;
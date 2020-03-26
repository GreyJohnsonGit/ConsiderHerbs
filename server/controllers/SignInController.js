const User = require('../models/User.js');

exports.signIn = (req, res) => {
    let unverifiedUser = new User(req.body);

    User.find({username: unverifiedUser.username}, (err, docs) => {
        if(err) {
            res.send({
                success: false,
                reason: 'A database error has occured'
            });
        }
        else if (docs.length === 0) {
            res.send({
                success: false,
                reason: 'Invalid username'
            });
        }
        else {
            if(User.comparePasswordSync(unverifiedUser.password, docs[0].password)) {
                res.send({
                    success: true,
                    reason: 'Valid username and password',
                    cookie: unverifiedUser.username //**DEBUG**
                });
            }
            else {
                res.send({
                    success: false,
                    reason: 'Invalid password'
                });
            }
        }
    })
};
exports.signUp = (req, res) => {
    let newUser = new User(req.body);
    newUser.password = User.hashPasswordSync(newUser.password);

    newUser.save(err => {
        if(err) {
            switch(err.code) {

            case 11000:
                res.send({
                    success: false,
                    reason: 'Username or email already in use'
                });
                break;
            default:
                res.send({
                    success: false,
                    reason: 'Database Error'
                });
            }
        }
        else {
            res.send({
                success: true,
                reason: 'New User Created',
                cookie: unverifiedUser.username //**DEBUG**
            });
        }
    });
};
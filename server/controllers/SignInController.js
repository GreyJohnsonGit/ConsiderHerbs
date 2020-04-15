const User = require('../models/User.js');
const SessionTable = require('../SessionTable.js');

exports.signIn = (req, res) => {
    let unverifiedUser = new User(req.body);

    User.find({username: unverifiedUser.username}, (err, docs) => {
        console.log(docs);
        if(err) {
            res.send({
                success: false,
                reason: 'A database error has occured'
            });
        }
        else if (docs.length === 0) {
            res.send({
                success: false,
                reason: 'Invalid username or password'
            });
        }
        else {
            if(User.comparePasswordSync(unverifiedUser.password, docs[0].password)) {
                if(unverifiedUser.method === docs[0].method){
                    res.send({
                        success: true,
                        reason: 'Valid username and password',
                        session: SessionTable.generateSession(unverifiedUser.username)
                    });
                }else{
                    res.send({
                        success: false,
                        reason: 'Invalid login method'
                    });
                }
            }
            else {
                res.send({
                    success: false,
                    reason: 'Invalid username or password'
                });
            }
        }
    })
};
exports.signUp = (req, res) => {
    let newUser = new User(req.body);
    newUser.password = User.hashPasswordSync(newUser.password);
    newUser.usertype = 'User';

    newUser.save(err => {
        if(err) {
            console.log("error: ", err)
            switch(err.code) {

            case 11000:
                console.log("duplicate: ", err.keyPattern.username)
                if (err.keyPattern.username === 1){
                    res.send({
                        success: false,
                        reason: 'Username already in use',
                    });
                }else{
                    res.send({
                        success: false,
                        reason: 'Email already in use',
                    });
                }
                break;
            default:
                res.send({
                    success: false,
                    reason: 'Database Error',
                });
            }
        }
        else {
            console.log("New User created: ", newUser)
            res.send({
                success: true,
                reason: 'New User Created',
                session: SessionTable.generateSession(newUser.username)
            });
        }
    });
};

exports.verify = (req, res) => {
    res.send({
        success: SessionTable.verify(req.body.sessionID)
    });
};

exports.logout = (req, res) => {
    res.send({
        success: SessionTable.eliminateSession(req.body.sessionID)
    });
}

exports.refresh = (req, res) => {
    if(SessionTable.verify(req.body.sessionID)) {
        res.send({
            success: true,
            reason: 'Session refreshed',
            session: SessionTable.refreshSession(req.body.sessionID)
        });
    }
    else {
        res.send({
            success: false,
            reason: 'Stale session'
        });
    }
}

exports.updatePassword = function(req, res) {
    var model = User;
    let item = req.body;
    model.findOne({username: req.params.username}, item).exec().then(function(doc,err){
        item.username = req.params.username;
        item.pasword = model.hashPasswordSync(req.params.password);
        res.send(item);
    })
}

exports.getAll = function(req, res) {
    var model = User;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.username > b.username) ? 1 : -1);
        res.header('Access-Control-Allow-Origin', '*');
        res.send(docs);
    })
}

exports.getUser = function(req, res) {
    var model = User;
    model.find({username : req.params.username}).exec().then(function(docs, err){
        res.send(docs);
    })
}


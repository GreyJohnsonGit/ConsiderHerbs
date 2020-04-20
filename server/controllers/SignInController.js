const User = require('../models/User.js');
const AuthenticationTools = require('../AuthenticationTools.js');

const Error = {
    dbError: {
        success: false,
        error: 'A database error has occured'
    },
    invalidUsernameOrPassword: {
        success: false,
        error: 'Invalid username or password'
    },
    invalidMethod: {
        success: false,
        error: 'Invalid login method'
    },
    usernameUsed: {
        success: false,
        error: 'Username already in use'
    },
    emailUsed: {
        success: false,
        error: 'Email already in use'
    },
    invalidSession: {
        success: false,
        error: 'Invalid Session Token'
    }
}

exports.signIn = (req, res) => {
    let unverifiedUser = req.body;
    User.find({username: unverifiedUser.username}, (err, docs) => {
        if(err) {
            res.send(Error.dbError);
        }
        else if (docs.length === 0) {
            res.send(Error.invalidUsernameOrPassword);
        }
        else if(unverifiedUser.method !== docs[0].method){
            res.send(Error.invalidMethod);
        }
        else if(User.comparePasswordSync(unverifiedUser.password, docs[0].password) === false) {
            res.send(Error.invalidUsernameOrPassword)
        }
        else{
            AuthenticationTools.generateSession(docs[0].username, (sessionPkg) => {
                res.send({
                    success: sessionPkg.success,
                    error: sessionPkg.error,
                    user: {
                        userLevel: docs[0].userLevel,
                        session: sessionPkg.session
                    }
                });
            });   
        }
    });
}

exports.signUp = (req, res) => {
    let newUser = req.body;
    newUser.password = User.hashPasswordSync(newUser.password);
    newUser.userLevel = 1;

    User.create(newUser, (err) => {
        if(err) {
            if(err.code === 11000) {
                if (err.keyPattern.username === 1) {
                    res.send(Error.usernameUsed);
                }
                else {
                    res.send(Error.emailUsed);
                }
            }
            else {
                console.error(err)
                res.send(Error.dbError);
            }
        }
        else {
            AuthenticationTools.generateSession(newUser.username, (sessionPkg) => {
                res.send({
                    success: true,
                    user: {
                        userLevel: 1,
                        session: sessionPkg.session 
                    }
                })
            });
        }
    });
}

exports.updatePassword = (req, res) => {
    let passData = req.body
    if(!passData.session) {
        res.send(Error.invalidSession);
    }
    else {
        User.find({username: passData.session.username}, (findErr, docs) => {
            if(findErr) {
                console.error(findErr)
                res.send(Error.dbError)
            }
            else if (docs.length === 0) {
                res.send(Error.invalidUsernameOrPassword)
            }
            else if(!User.comparePasswordSync(passData.oldPassword, docs[0].password)) {
                res.send(Error.invalidUsernameOrPassword)
            }
            else {
                docs[0].password = User.hashPasswordSync(passData.newPassword)
                docs[0].save((saveErr) => {
                    if(saveErr) {
                        console.error(saveErr)
                        res.send(Error.dbError)
                    }
                    else {
                        res.send({
                            success: true
                        })
                    }
                })
            }
        })
    }
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

exports.toggleSubscribe = (req, res) => {
    User.find({username: req.body.username}, (findErr, docs) => {
        if(findErr) {
            console.error(findErr)
            res.send(Error.dbError)
        }
        else if (docs.length === 0) {
            res.send(Error.invalidUsernameOrPassword)
        }
        else {
            docs[0].userLevel = docs[0].userLevel === 1 ? 2 : 1
            docs[0].save((saveErr) => {
                if(saveErr) {
                    console.error(saveErr)
                    res.send(Error.dbError)
                }
                else {
                    console.log(docs[0].userLevel)
                    AuthenticationTools.generateSession(docs[0].username, (sessionPkg) => {
                        res.send({
                            success: true,
                            user: {
                                userLevel: docs[0].userLevel,
                                session: sessionPkg.session 
                            }
                        })
                    });
                }
            })
        }
    })
}
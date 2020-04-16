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
        error: 'Username already in use',
    },
    emailUsed: {
        success: false,
        error: 'Email already in use',
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
                if(sessionPkg.success === false){
                    res.send({
                        success: sessionPkg.success,
                        error: sessionPkg.error
                    });
                }
                else {
                    res.send({
                        success: true,
                        user: {
                            userLevel: docs[0].userLevel,
                            session: sessionPkg.session
                        }
                    });
                }
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
                        userLevel: 0,
                        session: sessionPkg.session 
                    }
                })
            });
        }
    });
};
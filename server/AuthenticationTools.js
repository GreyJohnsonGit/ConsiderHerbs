var User = require('./models/User.js');
var SessionTable = require('./models/SessionTable.js');
var crypto = require('crypto');

const sessionDuration = 20 * 60 * 1000; //20mins

const Error = {
    dbError: {
        success: false,
        error: 'Database Error'
    },
    userNotFound: {
        success: false,
        error: 'User does not exist'
    },
    userLevelMismatch: {
        success: false,
        error: 'UserLevel does not match stored level'
    },
    sessionNotFound: {
        success: false,
        error: 'Session does not exist'
    },
    usernameMismatch: {
        success: false,
        error: 'Username does not match stored username'
    },
    sessionExpired: {
        success: false,
        error: 'Session has expired'
    }
}

/*  addSession
*   Generates session token for given username and passes its
*   value to the callback.
*/
const addSession = (sessionID, username, callback) => {
    let sessionToken = {
        sessionID: sessionID,
        username: username,
        expireTime: Date.now() + sessionDuration
    };

    SessionTable.create(sessionToken, (err) => {
        if(err) {
            console.error(err);
             callback(Error.dbError);
        }
        else {
            callback({
                success: true,
                session: sessionToken
            });
        }
    });
}

/*  generateSession
*   Generates sessionID and passes it along to addSession
*/
exports.generateSession = (username, callback) => {

    let sessionID = crypto.randomBytes(32).toString('base64');
    SessionTable.find({sessionID: sessionID}, (findErr, docs) => {
        if(findErr) {
            console.error(findErr);
            callback(Error.dbError);
        }
        else if(docs.length === 0) {
            addSession(sessionID, username, callback);
        }
        else if(docs.length !== 0 && docs[0].expireTime < Date.now()) {
            SessionTable.delete({sessionID: sessionID}, (deleteErr) => {
                if(deleteErr) {
                    console.error(deleteErr);
                    callback(Error.dbError);
                }
                else {
                    addSession(sessionID, username, callback);
                }
            });
        }
        else {
            this.generateSession(username, callback);
        }
    });    
}

/*  verifyUserSession
*   Attempts to verify and update user session. If successful passes
*   session token to callback, else passes error.
*/
exports.verifyUser = (user, callback) => {
    User.find({username: user.username}, (userErr, userDocs) => {
        if(userErr) {
            console.error(userErr);
            callback(Error.dbError);
        }
        else {
            if(userDocs.length === 0 ) {
                callback(Error.userNotFound);
            }
            else if (userDocs[0].userLevel !== user.userLevel) {
                callback(Error.userLevelMismatch);
            }
            else {
                SessionTable.find({sessionID: user.session.sessionID, username: user.username}, (sessionErr, sessionDocs) => {
                    if(sessionErr) {
                        console.error(sessionErr);
                        callback(Error.dbError);
                    }
                    else {
                        if(sessionDocs.length === 0) {
                            callback(Error.sessionNotFound);
                        }
                        else if(sessionDocs[0].username !== user.session.username) {
                            callback(Error.usernameMismatch);
                        }
                        else if(sessionDocs[0].expireTime < Date.now()) {
                            SessionTable.deleteOne({sessionID: user.session.sessionID}, (delErr) => {
                                if(delErr) {
                                    console.error(delErr);
                                    callback(Error.dbError);
                                }
                                else {
                                    callback(Error.sessionExpired);
                                }
                            });
                        }
                        else {
                            SessionTable.deleteOne({sessionID: user.session.sessionID}, (delErr) => {
                                if(delErr) {
                                    console.error(delErr);
                                    callback(Error.dbError);
                                }
                                else {
                                    this.generateSession(user.session.username, callback);
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
var crypto = require('crypto');

const sessionDuration = 20 * 60 * 1000;// 20mins

const SessionTable = {};

const generateSession = (username) => {
    
    let sessionID = crypto.randomBytes(32).toString('base64');
    while(SessionTable[sessionID]) {
        sessionID = crypto.randomBytes(32).toString('base64');
    }

    SessionTable[sessionID] = {
        sessionID: sessionID,
        username: username,
        expireTime: Date.now() + sessionDuration
    };
 
    return SessionTable[sessionID];
}

const eliminateSession = (sessionID) => {
    if(SessionTable[sessionID]) {
        delete SessionTable[sessionID];
        return true;
    }
    else {
        return false;
    }
}

const isSessionValid = (sessionID) => {
    let session = SessionTable[sessionID]; 
    if(session && Date.now() < session.expireTime) {
        return true;
    }
    else if(session) {
        eliminateSession(sessionID);
        return false;
    }
    else {
        return false;
    }
}

const refreshSession = (oldSessionID) => {
	if(!isSessionValid(oldSessionID))
		return {};

	let newSessionID = crypto.randomBytes(32).toString('base64');
    while(SessionTable[newSessionID]) {
        newSessionID = crypto.randomBytes(32).toString('base64');
    }

    SessionTable[newSessionID] = {
        sessionID: newSessionID,
        username: SessionTable[oldSessionID].username,
        expireTime: Date.now() + sessionDuration
    };
	eliminateSession(oldSessionID);
	
	return SessionTable[newSessionID];
}

exports.generateSession = generateSession;
exports.eliminateSession = eliminateSession;
exports.isSessionValid = isSessionValid;
exports.refreshSession = refreshSession;

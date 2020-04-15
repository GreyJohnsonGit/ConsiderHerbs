mongoose = require('mongoose');

const SessionTableSchema = new mongoose.Schema({

    username: {type: String, required: true},
    sessionID: {type: String, require: true, unique: true},
    expireTime: {type: Number, require: true}

});

module.exports = mongoose.model('SessionTable', SessionTableSchema);
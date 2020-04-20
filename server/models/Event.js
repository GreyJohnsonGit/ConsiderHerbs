//////Event.js

mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name : {type: String, required : true},
    type  : {type : String},
    date  : {type: Date},
    start_time : {type : String},
    end_time : {type : String},
    max_participants : {type : Number},
    current_participants : {type : Number},
    price : {type : Number},
    description : {type: String }
});

module.exports = mongoose.model('Event', EventSchema);

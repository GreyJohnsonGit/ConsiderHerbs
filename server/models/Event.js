mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    _id : {type: mongoose.Schema.Types.ObjectId},
    name : {type: String, required : true},
    type  : {type : String},
    date  : [{
        month : {type : String},
        day   : {type : String},
        weekday : {type : String},
        year  : {type : String}
    }],
    start_time : {type : String},
    end_time : {type : String},
    max_participants : {type : Number},
    current_participants : {type : Number},
    price : {type : Number},
    description : {type: String }
});

module.exports = mongoose.model('Event', EventSchema); 
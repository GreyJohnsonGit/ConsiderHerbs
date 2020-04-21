mongoose = require('mongoose');

const MeetingRequestSchema = new mongoose.Schema({
    name : {type: String, required : true},
    type  : {type : String},
    date  : {type: Date},
    start_time : {type : String},
    end_time : {type : String},
    description : {type: String},
    email : {type: String}
});


module.exports = mongoose.model('meetingrequest', MeetingRequestSchema); 
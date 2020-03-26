mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  thread_id : String,
  title : {type: String, default: "Put title here"},
  user  : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date  : {type: Date, default: Date.now},
  text  : {type: String, default: "Insert text here"},
  likes : mongoose.Number,
  replies: [{
    id  : String,
    text: {type: String, default: "Reply here"}, 
    date: {type: Date, default: Date.now},
    likes : {type: Number, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  numReplies : {type: Number, default: 0}, 
});
  
module.exports = mongoose.model('Thread', ThreadSchema);
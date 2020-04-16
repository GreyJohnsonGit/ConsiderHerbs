mongoose = require('mongoose');

const DidYouKnowSchema = new mongoose.Schema({
  postId : {type: String},
  title : {type: String, default: "Put title here"},
  date  : {type: Date, default: Date.now},
  body  : {type: String, default: "Insert text here"},
  sources : [{type: String}],
  image :{type: String},
  replies: [{
    threadId : {type: String},
    userId : {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: {type: String, default: "Comment here"}
  }]
});
  
module.exports = mongoose.model('didyouknow', DidYouKnowSchema);
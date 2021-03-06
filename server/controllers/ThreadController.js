const threadModel = require('../models/Threads.js');

exports.create = function(req,res) {
    var model = threadModel;
    let threadItem = new model(req.body);

    threadItem.save(function(err, doc){
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
            console.log(doc);
        }
    })
}

exports.read = function(req, res) {
    var model = threadModel;
    model.find({_id: req.params.thread_id}).exec().then(function(docs, err){
        if(err){
            res.send('error: Thread not found')
        }
        else{
            //assumes the thread_id is unique and only one result will be returned - can change to some id param later
            res.send(docs[0])
        }
    })
}

exports.update = function(req, res) {
    var model = threadModel;
    let item = req.body;
    model.findOneAndUpdate({_id: req.params.thread_id}, item).exec();
    //make the response pretty
    //item.title = req.params.title;
    res.send(item);
}

//removes thread entry, expects url param :title to denote which entry to remove
exports.remove = function(req, res) {
    var model = threadModel;
    model.find({title: req.params.title}).exec().then(function(docs, err){
        if(err){
            res.send(err.message);
        }
        else if(!docs.length){
            res.send('error: Entry not found');
        }
        else{
            model.find({title: req.params.title}).remove().exec();
            res.send(docs[0]);
        }
    })
}

//returns all threads in the database, sorted alphabetically by title
exports.getAll = function(req, res) {
    var model = threadModel;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.title > b.title) ? 1 : -1);
        res.header('Access-Control-Allow-Origin', '*');
        res.send(docs);
    })
}

exports.getAllReplies = function(req,res) {
    var model = threadModel;
    model.find({title: req.params.title}).exec().then(function(docs, err){
        res.send(docs[0].replies);
    })
}

exports.findMostLikedReply = function(req,res) {
    var model = threadModel;
    model.find({title: req.params.title}).exec().then(function(docs, err){
        docs[0].replies.sort((a,b) => (a.replies.likes > b.replies.likes) ? 1 : -1);
        res.send(docs[0].replies);
    })
}

exports.FindMostLikedThread = function(req,res) {
    var model = threadModel;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.likes > b.likes) ? 1 : -1);
        res.send(docs[0]);
    })
}

exports.getAllTags = function(req,res) {
    var model = threadModel;
    model.find({title: req.params.title}).exec().then(function(docs,err) {
        res.send(docs[0].tags);
    })
}

exports.getAllThreadsfromOneUser = function(req,res) {
    var model = threadModel;
    model.find({user: req.params.user}).exec().then(function(docs, err){
        if(err){
            res.send('error: Thread not found')
        }
        else{
            docs.sort((a,b) => (a.title > b.title) ? 1 : -1);
            res.header('Access-Control-Allow-Origin', '*');
            res.send(docs)
        }
    })
}
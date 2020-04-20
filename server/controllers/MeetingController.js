const MeetingRequestModel = require('../models/MeetingRequest.js');

exports.create = function(req,res) {
    var model = MeetingRequestModel;
    let MeetingRequestItem = new model(req.body);
    console.log("trying to post: ", req.body)
    MeetingRequestItem.save(function(err, doc){
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
        }
    })
}


//removes MeetingRequest entry, expects url param :name to denote which entry to remove
exports.remove = function(req, res) {
    var model = MeetingRequestModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        if(err){
            res.send(err.message);
        }
        else if(!docs.length){
            res.send('error: Entry not found');
        }
        else{
            model.find({name: req.params.name}).remove().exec();
            res.send(docs[0]);
        }
    })
}

//returns all MeetingRequests in the database, sorted alphabetically by name
exports.getAll = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var model = MeetingRequestModel;
    model.find({}).exec().then(function(docs, err){
       // docs.sort((a,b) => (a.name > b.name) ? 1 : -1);
        res.send(docs);
    })
}
//// EventController.js

const EventModel = require('../models/Event.js');

exports.create = function(req,res) {
    var model = EventModel;
    let EventItem = new model(req.body);
   // console.log("EventItem: ", EventItem);
    EventItem.save(function(err, doc){
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
        }
    })
}

exports.read = function(req, res) {
    var model = EventModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        if(err){
            res.send('error: Event not found')
        }
        else{
            res.send(docs[0])
        }
    })
}

exports.update = function(req, res) {
    var model = EventModel;
    let item = req.body;
    model.findOneAndUpdate({_id: req.params.id}, item).exec();
    item.id = req.params.id;
    res.send(item);
}

//removes Event entry, expects url param :name to denote which entry to remove
exports.remove = function(req, res) {
    var model = EventModel;
    console.log("ID received: ", req.params.id)
    model.find({_id: req.params.id}).exec().then(function(docs, err){
        if(err){
            res.send("there was an error delting ",req.params.id, ": ", err.message);
        }
        else if(!docs.length){
            res.send('error: Entry not found');
        }
        else{
            model.find({_id: req.params.id}).deleteOne().exec();
            res.send(docs[0]);
        }
    })
}

//returns all Events in the database, sorted alphabetically by name
exports.getAll = function(req, res) {
    var model = EventModel;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.name > b.name) ? 1 : -1);
        res.header('Access-Control-Allow-Origin', '*');
        res.send(docs);
    })
}

// returns price of given Event
exports.giveEventPrice = function(req,res) {
    var model = EventModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        res.send(docs[0].price);
    })
}

exports.getEventDate = function(req,res) {
    var model = EventModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        res.send(docs[0].date);
    })
}
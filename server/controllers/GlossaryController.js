const glossaryModel = require('../models/glossaryentry.js');

//assumes request has req.body ==> the object to be created in the db
exports.create = function(req, res) {
    var model = glossaryModel;
    let glossaryItem = new model(req.body);
    //if succesfully saves, the response returns the saved item, otherwise log error
    glossaryItem.save(function(err, doc){
        if(err){
            console.log(err);
        }
        else{
            res.send(doc)
        }
    })

}

//this returns from a POST request, the url should give a :title param
exports.read = function(req, res) {
    var model = glossaryModel;
    model.find({title: req.params.title}).exec().then(function(docs, err){
        if(err){
            res.send('error: Glossary entry not found')
        }
        else{
            //assumes the title is unique and only one result will be returned - can change to some id param later
            res.send(docs[0])
        }
    })


}

//updated glossary entry, expects req.body to contain updated entry fields
//expects url param :title to denote which entry to update
exports.update = function(req, res) {
    var model = glossaryModel;
    let item = req.body;
    model.findOneAndUpdate({title: req.params.title}, item).exec();
    //make the response pretty
    item.title = req.params.title;
    res.send(item);
}

//removes glossary entry, expects url param :title to denote which entry to remove
exports.remove = function(req, res) {
    var model = glossaryModel;
    //trick to get some responsive feedback as 'remove()' does not return anything
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

//returns all entries in the glossary, sorted alphabetically by title
exports.getAll = function(req, res) {
    var model = glossaryModel;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.title > b.title) ? 1 : -1);
        res.send(docs);
    })
}

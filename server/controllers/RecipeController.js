const recipeModel = require('../models/Recipes.js');

exports.create = function(req,res) {
    var model = recipeModel;
    let recipeItem = new model(req.body);

    recipeItem.save(function(err, doc){
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
        }
    })
}

exports.read = function(req, res) {
    var model = recipeModel;
    model.find({title: req.params.title}).exec().then(function(docs, err){
        if(err){
            res.send('error: recipe not found')
        }
        else{
            //assumes the recipe_id is unique and only one result will be returned - can change to some id param later
            res.send(docs[0])
        }
    })
}

exports.update = function(req, res) {
    var model = recipeModel;
    let item = req.body;
    model.findOneAndUpdate({title: req.params.title}, item).exec();
    //make the response pretty
    item.title = req.params.title;
    res.send(item);
}

//removes recipe entry, expects url param :title to denote which entry to remove
exports.remove = function(req, res) {
    var model = recipeModel;
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

//returns all recipes in the database, sorted alphabetically by title
exports.getAll = function(req, res) {
    var model = recipeModel;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.title > b.title) ? 1 : -1);
        res.header('Access-Control-Allow-Origin', '*');
        res.send(docs);
    })
}

exports.getAllIngredients = function(req,res) {
    var model = recipeModel;
    model.find({ingredients: req.params.ingredients}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.title > b.title) ? 1 : -1);
        res.send(docs);
    })
}
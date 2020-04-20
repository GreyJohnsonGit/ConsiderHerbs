const recipeModel = require('../models/Recipes.js');

exports.create = function(req,res) {
    var model = recipeModel;
    let recipeItem = new model(req.body);

    recipeItem.save(function(doc, err){
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
    model.find({name: req.params.name}).exec().then(function(docs, err){
        if(err){
            res.send('error: recipe not found')
        }
        else{
            //assumes the recipe_id is unique and only one result will be returned - can change to some id param 
            res.send(docs[0])
        }
    })
}

exports.update = function(req, res) {
    var model = recipeModel;
    let item = req.body;
    model.findOneAndUpdate({name: req.params.name}, item).exec();
    //make the response pretty
    item.name = req.params.name;
    item.userLevel  = req.body.userLevel;
    res.send(item);
}

//removes recipe entry, expects url param :name to denote which entry to remove
exports.remove = function(req, res) {
    var model = recipeModel;
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

//returns all recipes in the database, sorted alphabetically by name
exports.getAll = function(req, res) {
    //console.log(req)
    res.header("Access-Control-Allow-Origin", "*");
    var model = recipeModel;
    model.find({}).exec().then(function(docs, err){
        if(err){
            res.send(err)
        }
        docs.sort((a,b) => (a.name > b.name) ? 1 : -1);
        res.send(docs);
    })

}

exports.getAllIngredients = function(req,res) {
    var model = recipeModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        res.send(docs[0].ingredients);
    })
}
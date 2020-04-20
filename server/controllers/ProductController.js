const ProductModel = require('../models/Product.js');
var fs = require('fs');

exports.create = function(req,res) {
    var model = ProductModel;
    let ProductItem = new model(req.body);

    ProductItem.save(function(err){
        if (err) {
            console.log(err);
        }
        else {
            res.send({
                success: true
            })
        }
    })
}

exports.read = function(req, res) {
    var model = ProductModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        if(err){
            res.send('error: Product not found')
        }
        else{
            //assumes the Product_id is unique and only one result will be returned - can change to some id param later
            res.send(docs[0])
        }
    })
}

exports.update = function(req, res) {
    var model = ProductModel;
    let item = req.body;
    model.findOneAndUpdate({name: req.params.name}, item).exec();
    //make the response pretty
    item.name = req.params.name;
    res.send(item);
}

//removes Product entry, expects url param :name to denote which entry to remove
exports.remove = function(req, res) {
    var model = ProductModel;
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

//returns all Products in the database, sorted alphabetically by name
exports.getAll = function(req, res) {
    var model = ProductModel;
    model.find({}).exec().then(function(docs, err){
        docs.sort((a,b) => (a.name > b.name) ? 1 : -1);
        res.header('Access-Control-Allow-Origin', '*');
        res.send(docs);
    })
}

// returns price of given Product
exports.giveProductPrice = function(req,res) {
    var model = ProductModel;
    model.find({name: req.params.name}).exec().then(function(docs, err){
        res.send(docs[0].price);
    })
}
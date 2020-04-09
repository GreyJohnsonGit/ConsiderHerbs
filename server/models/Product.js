mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id : {type: mongoose.Schema.Types.ObjectId},
    name : String,
    description : String,
    price : Number,
    image :{type: String}
});

module.exports = mongoose.model('Product', ProductSchema);
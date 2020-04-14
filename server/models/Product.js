mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id : {type: mongoose.Schema.Types.ObjectId},
    name : {type: String, required : true},
    description : {type: String, required : true},
    type  : {type : String, enum: ['ConsiderHerbs', 'Affiliate', 'Suggested']},
    link  : String,
    price : Number,
    image :{type: String}
});

module.exports = mongoose.model('Product', ProductSchema);
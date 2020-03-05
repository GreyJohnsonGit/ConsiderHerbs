import mongoose from 'mongoose';
const GlosserySchema = new mongoose.Schema({
  id : {type:mongoose.Number, required: true},
  title : {type:String, required: true},
  definition: String, 
  usage: String
});
export default mongoose.model('GlosseryEntry', listingSchema);
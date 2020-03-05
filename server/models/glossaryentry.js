import mongoose from 'mongoose';
const GlossarySchema = new mongoose.Schema({
  title : {type:String, required: true},
  definition: String, 
  usage: String
});
export default mongoose.model('GlossaryEntry', GlossarySchema);
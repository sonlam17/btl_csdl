import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  
  dose: { type: String, required: true },
  
  price: { type: Number, required: true },
},{ versionKey: false });

export default mongoose.model('Medication', MedicationSchema);
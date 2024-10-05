import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  
  dose: { type: String, required: true },
  
  price: { type: Number, required: true },
});

export default mongoose.model('Medication', MedicationSchema);
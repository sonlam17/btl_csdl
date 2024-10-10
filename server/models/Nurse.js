import mongoose from "mongoose";

const NurseSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  
  personal_id: { type: String, required: true },
  
  birthdate: { type: Date, required: true },
  
  phone: { type: String, required: true },
  
  address: { type: String, required: true },
  
  specialty: { type: String, required: true },
});

export default mongoose.model('Nurse', NurseSchema);
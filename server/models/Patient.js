import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({

    name: { type: String, required: true },
  
    personal_id: { type: String, required: true },
  
    birthdate: { type: Date, required: true },
  
    address: { type: String, required: true },
  
    phone: { type: String, required: true },
    
},{ versionKey: false });

export default mongoose.model('Patient', PatientSchema);
import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },

  personal_id: { type: String, required: true },

  birthdate: { type: Date, required: true },

  address: { type: String, required: true },

  professional_level: { type: String, required: true },

  experience_years: { type: Number, required: true },

  education_level: { type: String, required: true },

  specialty: { type: String, required: true },
  
},{ versionKey: false });

export default mongoose.model('Doctor', DoctorSchema);
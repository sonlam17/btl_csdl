import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
 
  nurse_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse', required: true },
  
  visit_date: { type: Date, required: true },
  
  discharge_date: { type: Date, required: true },
  
  diagnosis: { type: String, required: true },
  
  treatment_cost: { type: Number, required: true },
  
  prescriptions: [
    {
      medication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('Visit', VisitSchema);
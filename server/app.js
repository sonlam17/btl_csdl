import express from 'express';
import patientRoutes from './routes/patient.route.js';
import visitRoutes from './routes/visit.route.js';
import nurseRoutes from './routes/nurse.route.js';
import doctorRoutes from './routes/doctor.route.js';
import medicationRoutes from './routes/medication.route.js';
import mongoose from 'mongoose';
import config from "../config.js";
import bodyParser from 'body-parser';

const connectToDB = async () => {
    try {
        await mongoose.connect(config.db_uri, {})
    }catch (e) {
        console.log(e);
        process.exit(1)
    }
}

const app = express();

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/medications', medicationRoutes);
app.use('/visits', visitRoutes);
app.use('/nurses', nurseRoutes);
app.use('/doctors', doctorRoutes);
await connectToDB();

export default app;
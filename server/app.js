import express from 'express';
import patientRoutes from './routes/patient.route.js';
import visitRoutes from './routes/visit.route.js';
import nurseRoutes from './routes/nurse.route.js';
import doctorRoutes from './routes/doctor.route.js';
import medicationRoutes from './routes/medication.route.js';
import mongoose from 'mongoose';
import config from "./config.js";
import bodyParser from 'body-parser';
const MONGO_URI = 'mongodb://localhost:27017/tbl_csdl'; // Thay thế bằng URI kết nối đến MongoDB của bạn


const connectToDB = async () => {
    try {
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,family: 4 })
          .then(() => console.log('Kết nối MongoDB thành công!'))
          .catch((error) => console.error('Lỗi kết nối MongoDB:', error));
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
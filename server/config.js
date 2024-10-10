import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const config = {
    app_name: process.env['APP_NAME'],
    port: process.env['PORT'] ?? 3000,
    db_uri: process.env['DB_URI'] ?? 'mongodb://127.0.0.1:27017/tbl_csdl',
    db_options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

export default config;
import app from "./app.js";
import { connectDb } from './database/db.js'
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.listen(process.env.PORT, () => {
    connectDb()
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})
import mongoose from 'mongoose'

mongoose.set('strictQuery', false);
export const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Lms"
    })
    .then(() => {
        console.log("Database connection successfully");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1)
    })
}


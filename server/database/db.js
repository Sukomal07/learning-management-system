import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'Lms',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Terminate the application with an error code (1)
    }
};

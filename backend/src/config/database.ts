import mongoose from 'mongoose';
import { MONGODB_URI } from '.';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;

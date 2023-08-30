import mongoose from 'mongoose';
import { connectionstring } from '.';

const connectDB = async () => {
  try {
    await mongoose.connect(connectionstring, {});
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;

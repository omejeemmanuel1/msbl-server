import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
  role: string;
  status: string;
}

export const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive', 
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<UserDocument>('User', UserSchema);

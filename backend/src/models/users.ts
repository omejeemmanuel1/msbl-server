import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: any;
  role: any;
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
      enum: ['admin', 'initiator', 'checker', 'requester'],
      default: 'pending',
    },
    department: {
      type: String,
      enum: ['admin', 'initiator', 'checker', 'requester'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<UserDocument>('User', UserSchema);

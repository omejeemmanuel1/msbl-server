import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  status: any;
}

export const UserSchema = new Schema<UserDocument>(
  {
    fullName: {
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
    status: {
      type: String,
      enum: ['pending', 'verified', 'suspended'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<UserDocument>('User', UserSchema);

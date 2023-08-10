import mongoose, { Schema, Document } from 'mongoose';

export interface RequestDocument extends Document {
  clientName: string;
  clientEmail: string;
  clientPhone: number;
  initiator: string;
  narration: string;
  title: string;
  stage: string;
  docURL: string;
  authURL: string;
  comment: string;
  status: any;
}

export const RequestSchema = new Schema<RequestDocument>(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
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
    clientPhone: {
      type: Number,
      required: true,
    },
    initiator: {
      type: String,
      required: true,
    },
    narration: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<RequestDocument>('Request', RequestSchema);

import mongoose, { Schema, Document } from 'mongoose';

interface OtpInfo {
  userId: string;
  otp: number;
  expiry: Date;
}

export interface VerificationDocument extends Document, OtpInfo {}

const VerificationSchema = new Schema<VerificationDocument>(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
      ref: 'User',
    },
    otp: {
      type: Schema.Types.Number,
      required: true,
    },
    expiry: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Verification = mongoose.model<VerificationDocument>(
  'Verification',
  VerificationSchema,
);

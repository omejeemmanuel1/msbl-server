import mongoose, { Schema, Document } from 'mongoose';

export enum WorkflowStage {
  Draft = 'Request Sent',
  Review = 'In Progress',
  Approval = 'Request Approved',
  Declined = 'Request Declined',
  Completed = 'Request Completed',
  Cancelled = 'Request Cancelled',
}

export interface Comment {
  text: string;
  timestamp: Date;
  user: string;
}

export interface RequestDocument extends Document {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  initiator: string;
  narration: string;
  type: string;
  status: string;
  docURL: string;
  authURL: string;
  comments: Comment[];
  stage: WorkflowStage;
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
      type: String,
      required: true,
    },
    initiator: {
      type: String,
      required: true,
    },
    narration: {
      type: String,
    },
    type: {
      type: String,
    },
    docURL: {
      type: String,
    },
    authURL: {
      type: String,
    },
    stage: {
      type: String,
      enum: Object.values(WorkflowStage),
      required: true,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
          default: Date.now,
        },
        user: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

export const Requests = mongoose.model<RequestDocument>(
  'Request',
  RequestSchema,
);

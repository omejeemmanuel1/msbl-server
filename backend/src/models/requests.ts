import mongoose, { Schema, Document } from 'mongoose';

export enum WorkflowStage {
  Draft = 'Initiated', //Initial stage, after creating a request by the initiator
  Review = 'In Progress', //When a comment is added either by an initiator or checker
  Approval = 'Approved', //When approved by operations (after adding comment)
  Declined = 'Declined', //When declined by either initiator or checker
  Completed = 'Completed', //When approved by the initiator following approval by checker
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
      unique: false,
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
      enum: ['Started', 'Pending', 'Completed'],
      required: true,
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

import mongoose, { Schema, Document } from 'mongoose';

export interface DepartmentDocument extends Document {
  departmentName: string;
}

export const DepartmentSchema = new Schema<DepartmentDocument>(
  {
    departmentName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Department = mongoose.model<DepartmentDocument>('Department', DepartmentSchema);

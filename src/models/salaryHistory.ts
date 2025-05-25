import mongoose, { Schema, Document } from "mongoose";

export interface ISalaryEntry extends Document {
  empid: string; // Use empid (string) instead of ObjectId
  ctc: number;
  effective_from: Date;
  remarks?: string;
  isOverwrite: boolean;
}

const SalaryHistorySchema: Schema = new Schema(
  {
    empid: { type: String },
    ctc: { type: Number},
    effective_from: Date  ,
    remarks: { type: String, default: "", trim: true },
    isOverwrite: { type: Boolean, default: false },
  },
  { collection: "salary_history", timestamps: true }
);

// Add an index for faster queries on empid and effective_from
SalaryHistorySchema.index({ empid: 1, effective_from: 1 });

export const SalaryHistory = mongoose.model<ISalaryEntry>("SalaryHistory", SalaryHistorySchema);
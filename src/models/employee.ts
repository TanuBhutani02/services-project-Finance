import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  empid: string;
  name: string;
}

const EmployeeSchema: Schema = new Schema(
  {
    empid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { collection: "employee", timestamps: true }
);


export const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
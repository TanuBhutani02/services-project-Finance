import mongoose, { Schema } from "mongoose";

interface SalaryEntry {
    ctc: number;
    effective_from: Date;
  }
  
  interface IEmployee extends Document {
    empid: string;
    name: string;
    salary_history: SalaryEntry[];
  }
  
  const EmployeeSchema: Schema = new Schema(
    {
      empid: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      salary_history: [
        {
          ctc: { type: Number, required: true },
          effective_from: { type: Date, required: true },
        },
      ],
    },
    { collection: "employee", timestamps: true }
  );
  
  export const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
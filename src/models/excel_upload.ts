import { Schema, Document, model } from 'mongoose';

// Define the interface for the Excel data model
export interface IExcelData extends Document {
    project_name: string;
    employee_name: string;
    employee_id: string;
    cost_to_company: number;
    actual_billing_cost: number;
    gross_margin: number;
}

// Define the Excel data schema
const ExcelDataSchema: Schema = new Schema(
    {
        project_name: { type: String, required: true },
        employee_name: { type: String, required: true },
        employee_id: {
            type: String,
            required: true,
            unique: true,
            default: () => Math.random().toString(36).substr(2, 9).toUpperCase()
        },
        cost_to_company: { type: Number, required: true },
        actual_billing_cost: { type: Number, required: true },
        gross_margin: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

// Create and export the Excel data model
const ExcelData = model<IExcelData>('ExcelData', ExcelDataSchema);
export default ExcelData;

import { Request } from 'express';
import ExcelData from '../models/excel_upload';
import { IFormattedExcelDataUploadType, UploadedData } from '../types/upload';

export const storeExcelData = async (req: Request): Promise<void> => {
    if (!req.body || !Array.isArray(req.body)) {
        throw new Error('Invalid JSON data');
    }

    const jsonData: IFormattedExcelDataUploadType[] = req.body;

    const formattedData = jsonData.map(record => ({
        project_name: record.projectName,
        employee_name: record.employeeName,
        employee_id: record.employeeId,
        cost_to_company: record.costToCompany,
        actual_billing_cost: record.actualBillingCost,
        gross_margin: ((record.actualBillingCost - record.costToCompany) / record.actualBillingCost) * 100
    }));

    try {
        await ExcelData.insertMany(formattedData);
    } catch (error) {
        throw new Error(`Error processing JSON data: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
};

export const getStoredExcelData = async (): Promise<UploadedData | null> => {
    try {
        const data = await ExcelData.find({}).lean();
        return { data };
    } catch (error) {
        throw new Error(`Error retrieving stored Excel data: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
};

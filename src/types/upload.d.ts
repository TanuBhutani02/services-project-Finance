import { IExcelData } from "../models/excel_upload";

export interface IFormattedExcelDataUploadType {
    projectName: string;
    employeeName: string;
    employeeId: string;
    costToCompany: number;
    actualBillingCost: number;
}

export interface UploadedData {
    data: IExcelData[];
}


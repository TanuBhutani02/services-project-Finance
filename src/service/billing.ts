import { Billing } from "../models/billing";
import { mapBiillingUIToBillingSchema } from "../utils/mappingSchema";
import { EmployeeService } from "./employee";
import { OrgBillingService } from "./orgBilling";

export class BillingService{

    public async createBilling(data: any) {
        try {
      const orgConversionRate = await new OrgBillingService().getOrgBilling();
      const emloyeeData = await new EmployeeService().getEmployeeDetails()
     
       const billingData = mapBiillingUIToBillingSchema(data, emloyeeData, orgConversionRate.org_conversion_rate);
       const filter = { project: data.project, month: data.month, year: data.year};
       const options = { upsert: true, new: true };
        return await Billing.findOneAndUpdate(filter,billingData,options);
        } catch(error: any){
            throw new Error(`Error creating billing${error.message}`);
        }
    }

    public async getBilling(filterData: { projects: any[]; year: any; month?: any }){
        try{

            const query: { project: { $in: any[] }; year: any; month?: any } = {
                project: { $in: filterData.projects }, 
                year: filterData.year, 
              };
              
              // Add month filter **only if** it's provided
              if (filterData.month) {
                query.month = +filterData.month;
              }
        
              // Execute the query
              const data = await Billing.find(query);
           
           return data;
        }catch(error: any){
            throw new Error(`Error getting billing${error.message}`);
        }
    }
}
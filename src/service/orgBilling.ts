import { OrgBilling } from "../models/orgBilling";
import { mapBillingSchemaToUI } from "../utils/mappingSchema";
import { EmployeeService } from "./employee";

export class OrgBillingService{
    public async getOrgBilling() {
        try{
            const orgBilling : any =  await OrgBilling.findOne().lean();
            return orgBilling;
        } catch(error: any){
            throw new Error(`Error getting orgBilling${error.message}`);
        }
    }

     public async createOrgBilling(data: any) {
            try {
            return await OrgBilling.findOneAndUpdate(data);
            } catch(error: any){
                throw new Error(`Error creating billing${error.message}`);
            }
        }
}
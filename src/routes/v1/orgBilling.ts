import {Router} from "express";
import { Billing } from "../../config/controllers/billing";
import { OrgBilling } from "../../config/controllers/orgBilling";
export const OrgBillingRouter = Router();

//BillingRouter.get('/',Billing.get);
//BillingRouter.post('/',Billing.create);

OrgBillingRouter.route('/').post(OrgBilling.create).delete(OrgBilling.remove).get(Billing.get);

import { Router } from "express";
import { Billing } from "../../config/controllers/billing";

export const BillingRouter = Router();
debugger;
// Route to create a new project
BillingRouter.post('/', Billing.create);
debugger;
// Route to get filtered billing data
BillingRouter.post('/filter', Billing.filterProjects);

// Route to delete a project
BillingRouter.delete('/', Billing.remove);

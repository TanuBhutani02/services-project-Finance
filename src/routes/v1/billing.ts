import { Router } from "express";
import { Billing } from "../../config/controllers/billing";

export const BillingRouter = Router();

// Route to create a new project
BillingRouter.post('/', Billing.create);

// Route to get filtered billing data
BillingRouter.post('/filter', Billing.filterProjects);

// Route to delete a project
BillingRouter.delete('/', Billing.remove);

import { Router } from 'express';
import uploadRoutes from './v1/upload';
import loginRoutes from './v1/login';
import { ProjectRouter } from './v1/project';
import { BillingRouter } from './v1/billing';
import { Employee } from '../models/employee';
import { EmployeeRouter } from './v1/employee';
import { OrgBillingRouter } from './v1/orgBilling';

const router = Router();

// Hook the upload routes
router.use('/v1/upload', uploadRoutes);
router.use('/v1/users', loginRoutes);
router.use('/v1/project', ProjectRouter);
router.use('/v1/billing', BillingRouter);
router.use("/v1/employees",EmployeeRouter);
router.use("/v1/orgBilling",OrgBillingRouter);

export default router;

import { Router } from "express";
import { employee } from "../../config/controllers/employee";

export const EmployeeRouter = Router();
EmployeeRouter.route("/").put(employee.update).delete(employee.remove).get(employee.getAll);
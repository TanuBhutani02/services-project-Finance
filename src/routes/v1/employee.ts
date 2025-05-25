import { Router } from "express";
import { employee } from "../../config/controllers/employee";

export const EmployeeRouter = Router();

// Define specific routes first (like create and update)
EmployeeRouter.route("/create").post(employee.create);
EmployeeRouter.route("/").put(employee.update);

// Then, define the parameterized route (e.g., for fetching a single employee by ID)
EmployeeRouter.route("/:id").get(employee.getEmployeeDetail);  // This must come after the other routes

// Finally, define the general route (e.g., to get all employees)
EmployeeRouter.route("/").get(employee.getAll);

import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { EmployeeService } from "../../service/employee";

class EmployeeController extends BaseController {
    private employeeService = new EmployeeService();

    constructor(){
        super();
        this.employeeService; new EmployeeService();
        this.get = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.create = this.create.bind(this);
      }

  get(req: Request, res: Response): void {
      throw new Error("Method not implemented.");
  }
  async getAll(req: Request, res: Response): Promise<void> {
    try{
      const data =  await this.employeeService.getEmployeeDetails();
       this.handleSuccess(res,data);
    }catch(err){
        this.handleError(res,err);
    }
  }
  async update(req: Request, res: Response) {
   await  this.employeeService.storeEmployeeData(req.body);
        this.handleSuccess(res);
  }
  remove(req: Request, res: Response): void {
      throw new Error("Method not implemented.");
  }
  create(req: Request, res: Response): void {
     this.employeeService.storeEmployeeData(req.body);
  }
 
}

export const employee = new EmployeeController();
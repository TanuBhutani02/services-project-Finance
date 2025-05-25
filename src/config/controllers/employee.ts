import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { EmployeeService } from "../../service/employee";

class EmployeeController extends BaseController {
  get(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
    private employeeService = new EmployeeService();

    constructor(){
        super();
        this.employeeService; new EmployeeService();
        this.get = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.create = this.create.bind(this);
        this.getEmployeeDetail = this.getEmployeeDetail.bind(this);
      }

  async getEmployeeDetail(req: Request, res: Response): Promise<any> {
    try{
      console.log("req.params #########################################",req.params);
    const userId = req.params.id;
    console.log("userId",userId);
    const data =  await this.employeeService.getEmployeeById(userId);
    this.handleSuccess(res,data);
    }catch(err){
      this.handleError(res,err);
    }

  }
  async getAll(req: Request, res: Response): Promise<void> {
    try{
      const data =  await this.employeeService.getEmployeeDetails();
      console.log("data",data);
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
  async create(req: Request, res: Response): Promise<void> {
    console.log("req.body employees",req.body);
     await this.employeeService.storeEmployeeData(req.body);
     this.handleSuccess(res);
  }
 
}

export const employee = new EmployeeController();
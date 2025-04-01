import { Request, Response } from "express";
import { BillingService } from "../../service/billing";
import { BaseController } from "./BaseController";
import { getTotalWorkingHours } from "../../utils/billing";

class BillingController extends BaseController {
   
    private billingService: BillingService;

    constructor() {
        super();
        this.billingService = new BillingService();
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.filterProjects = this.filterProjects.bind(this);
       
    }
 public  async getAll(req: Request, res: Response): Promise<any> {
    
    }
    get(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
   public update(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
  public  async filterProjects(req: Request, res: Response): Promise<void> {
    try{
       const data = await this.billingService.getBilling(req.body);
        this.handleSuccess(res, data);
  }catch(err){
  this.handleError(res,err);
  }
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            await this.billingService.createBilling(req.body);
            this.handleSuccess(res);
        } catch (error) {
            this.handleError(res, error);
        }
    }
   
    public remove(req: Request, res: Response): void {
        try {
            const data = {};
            this.handleSuccess(res, data);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

export const Billing = new BillingController();
import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { OrgBillingService } from "../../service/orgBilling";

class OrgbillingController extends BaseController {
    private orgBillingService: OrgBillingService;

    constructor() {
        super();
        this.orgBillingService = new OrgBillingService();
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
       
    }
 public  async getAll(req: Request, res: Response): Promise<any> {
    
    }
   public update(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
  public  async get(req: Request, res: Response): Promise<void> {
       const data =  await this.orgBillingService.getOrgBilling();
        this.handleSuccess(res, data);
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            await this.orgBillingService.createOrgBilling(req.body);
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

export const OrgBilling = new OrgbillingController();
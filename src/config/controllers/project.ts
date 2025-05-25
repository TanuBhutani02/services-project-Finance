import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ProjectService } from "../../service/project";

 class ProjectController extends BaseController {
  private projectService: ProjectService;
  constructor(){
    super();
    this.projectService  = new ProjectService();
       this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
  }
  public async create(req: Request, res: Response) {
    try {
    await this.projectService.addProject(req.body);
     this.handleSuccess(res);
    } catch(error){
      this.handleError(res, error);
    }
  }
  public get(req: Request, res: Response): void {
    try {
    
      const data = {};
      // const data = await roleMenuPermission(req.params.role);
      this.handleSuccess(res, data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async getAll(req: Request, res: Response): Promise<any> {
    try {
      const data = await this.projectService.getAllProjects();
      this.handleSuccess(res, data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public update(req: Request, res: Response): void {
    try {
      console.log('variable = ', parseInt(req.params.role, 10));
      const data = {};
      // const data = await roleMenuPermission(req.params.role);
      this.handleSuccess(res, data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public remove(req: Request, res: Response): void {
    try {
      console.log('variable = ', parseInt(req.params.role, 10));
      const data = {};
      // const data = await roleMenuPermission(req.params.role);
      this.handleSuccess(res, data);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

export const project =  new ProjectController();
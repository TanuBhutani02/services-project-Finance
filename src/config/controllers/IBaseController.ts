import { Request, Response } from "express";

export interface IBaseController {
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  create(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  remove(req: Request, res: Response): void;
}
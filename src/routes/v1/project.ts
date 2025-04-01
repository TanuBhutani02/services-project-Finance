import {Router} from "express";
import { project } from "../../config/controllers/project";

export const ProjectRouter = Router();

ProjectRouter.route('/').get(project.getAll).post(project.create)
ProjectRouter.route('/:id').get(project.get).patch(project.update).delete(project.remove)
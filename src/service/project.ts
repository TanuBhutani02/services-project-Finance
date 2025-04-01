import { Project } from "../models/project";

import { camelToSnakeCaseKeys, snakeToCamelCaseKeys } from "../utils/helper";

export class ProjectService {
   public async addProject(data: any){
    const project = new Project(camelToSnakeCaseKeys(data));
    console.log(project);
    await project.save();
   }
   public async getAllProjects(){
    const data =  await Project.find().select("-createdAt -updatedAt -__v").lean();
     return data.map((el)=>snakeToCamelCaseKeys(el))
   
   }
}
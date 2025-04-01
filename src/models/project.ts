import mangoose, { Schema } from "mongoose";
import crypto from 'crypto';

interface IProject extends Document{
  name: string,
  bu_head: string,
  delievery_manager: string,
  billing_type: string
}

const ProjectSchema = new Schema({
  Id: {type: String, default :()=>crypto.randomUUID()},
    name:{type: String, required: true},
    bu_head: {type: String, required: true},
    delievery_manager:{type: String, requied: true},
    billing_type:{type: String, required: true}
},{collection:"projects", timestamps: true})

export const Project = mangoose.model<IProject>('Project',ProjectSchema)
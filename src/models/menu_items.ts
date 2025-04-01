import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '../types/role';

export interface IMenuItem extends Document {
  name: string;
  icon: string;
  path: string;
  roles: Role[]; // Use the Roles enum type
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  path: { type: String, required: true },
  roles: { 
    type: [Number], 
    required: true,
    enum: [Role.SUPER_ADMIN, Role.USER] // Restrict to enum values
  },
});

const MenuItemList: Schema = new Schema({
  menuItems: [MenuItemSchema]
});

export const MenuItems = mongoose.model('MenuItems', MenuItemList);
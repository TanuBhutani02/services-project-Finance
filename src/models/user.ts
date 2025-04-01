// sample user schema, need to be removed
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: number;
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true } // Changed role type to Number
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const UserList: Schema = new Schema({
  users: [UserSchema]
});

// Create and export the User model
const User = mongoose.model<IUser>('Users', UserList);
export default User;

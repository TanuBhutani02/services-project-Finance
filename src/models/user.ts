// sample user schema, need to be removed
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;

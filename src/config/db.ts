import mongoose from 'mongoose';
import { seedData } from '../scripts/seedRoleData';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI!;
    const db = uri.replace('<password>', process.env.DATABASE_PASSWORD!);
    await mongoose.connect(db, {
    }).then((con) => {console.log("'MongoDB connected successfully! with",con.connection.name)});
    seedData();
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;

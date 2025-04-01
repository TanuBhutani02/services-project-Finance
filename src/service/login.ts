//import jwt from 'jsonwebtoken';
import { cwd } from 'process';
import User, { IUser } from '../models/user';
import { createResponse } from '../utils/responseHandler';

export const loginUser = async (email: string, password: string): Promise<any> => {
  console.log('test data ',);
    // console.log('test login user final = ',User, email,password);
   // const user = await User.findOne({ email, password });
  const userDocument: any = await User.findOne(
    { users: { $elemMatch: { email, password } } },
    { 'users.$': 1 } // Projection to include only the matching user
  );
console.log('variable = ',userDocument, userDocument.users ? userDocument.users[0] : undefined);
  if (userDocument && userDocument.users && userDocument.users.length > 0) {
    const user = userDocument.users[0];
    console.log('test login user final = ', user);
    return { role: user.role };
  }
     
    
    // if(user?.role){
    //     createResponse({role:user.role},200);
    // }
    // console.log('variable = ',user);
    // if (!user) {
    //     throw new Error('Invalid credentials');
    // }

    // const token = ""
    // //jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    // return token;
};
import { Router } from 'express';
import { login } from '../../config/controllers/loginController';
//import { loginUser } from '../../service/auth';
import * as user from '../../config/controllers/user';

const router = Router();

// Handle user login
//router.post('/login', async (req, res) => {

    // try {
    //     const { email, password } = req.body;
    //     //const result = await loginUser(email, password);
    //     //sres.status(200).json(result);
    // } catch (error) {
    //     if (error instanceof Error) {
    //         res.status(400).json({ error: error.message });
    //     } else {
    //         res.status(500).json({ error: 'An unknown error occurred' });
    //     }
    // }
//});

console.log('routes call ',);
router.post('/login', login);
router.get('/role/:role', user.getRoleMenuPermissions);

export default router;

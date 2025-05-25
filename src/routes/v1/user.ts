import { Router } from 'express';
import * as user from '../../config/controllers/user';
import login from './login';
const router = Router();


router.post('/login', login);
router.get('/role/:role', user.getRoleMenuPermissions);
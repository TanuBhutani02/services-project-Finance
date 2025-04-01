import { Request, Response } from 'express';
import { loginUser } from '../../service/login';
import { handleError } from '../../utils/errorHandler';
import { createResponse } from '../../utils/responseHandler';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await loginUser(email, password);
        res.status(200).json(createResponse(data, 200));
    } catch (error) {
        handleError(res, error);
    }
};
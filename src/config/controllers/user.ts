import { Request, Response } from 'express';
import { handleError } from '../../utils/errorHandler';
import { createResponse } from '../../utils/responseHandler';
import { roleMenuPermission } from '../../service/user';

export async function getRoleMenuPermissions(req: Request, res: Response) {
    try {
        console.log('variable = ', parseInt(req.params.role,10));
        const data = await roleMenuPermission(req.params.role);
        res.status(200).json(createResponse(data, 200));
    } catch (error) {
        handleError(res, error);
    }
}
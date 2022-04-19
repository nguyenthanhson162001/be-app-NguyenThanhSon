import { NextFunction, Request, Response } from "express";
import { sendError } from "../../util/res.util";
import jwt from 'jsonwebtoken'

export const checkToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["auth-token"]
    if (!token)
        return sendError(400, { message: 'missing auth-token in header' }, res);
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as any
        req.userID = verified._id;
        req.role = verified.role;
        next();
    } catch (error) {
        return sendError(400, { message: 'Invalid token' }, res);
    }

}


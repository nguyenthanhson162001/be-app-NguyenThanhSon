import { NextFunction, Request, Response } from "express";
import { sendError } from "../../util/res.util";

const jwt = require('jsonwebtoken');

export default function (req: any, res: Response, next: NextFunction) {
    const token = req.headers["auth-token"]
    if (!token)
        return res.status(401).send('Login require')
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.userID = verified._id
        next()
    } catch (error) {
        sendError(400, 'Invalid token', res);
    }
}


import { Response } from 'express'
export const sendError = (status: number, mgs: any, res: Response) => {
    res.status(status).json({
        status: false,
        error: mgs
    });
}
export const sendResult = (mgs: any, res: Response) => {
    var result = {
        status: true
    } as any
    if (mgs)
        result.result = mgs
    res.status(200).json(result);
}

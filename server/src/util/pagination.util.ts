import { Request } from "express";
export const getOptionInRequest = (req: Request) => {
    var { page, limit } = req.query as any
    if (!limit || isNaN(limit))
        limit = 5
    if (!page || isNaN(page))
        page = 1;

    return {
        limit, page
    }
}
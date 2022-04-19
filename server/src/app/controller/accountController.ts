import { sendError, sendResult } from "../../util/res.util";
import { loginValidation } from "../../util/valiadtion";
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getAccountByEmailPassword } from "../../util/account.util";

// [DELETE]/account/delete?userId=
export const getToken = async (req: Request, res: Response) => {

    var { error, value } = await loginValidation.validate(req.body) as any;
    if (error) {
        return sendError(400, error?.details[0], res);
    }
    console.log(value)
    var account = await getAccountByEmailPassword(value.email, value.password);
    if (!account)
        return sendError(400, { message: 'Email or password not correct' }, res);

    const token = jwt.sign({ _id: account._id, role: account.role }, process.env.JWT_SECRET as string, {
        expiresIn: "48h",
    });
    sendResult({ token }, res)
}
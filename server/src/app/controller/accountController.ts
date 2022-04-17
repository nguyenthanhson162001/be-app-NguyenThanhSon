import { sendError, sendResult } from "../../util/res.util";
import { loginValidation } from "../../util/valiadtion";
import { Request, Response } from 'express'
import { getUserByEmail } from "../../util/user.util";
import jwt from 'jsonwebtoken'
import { getAccountByEmailPassword } from "../../util/account.util";

// [DELETE]/account/delete?userId=
export const getToken = async (req: Request, res: Response) => {

    var { error, value } = await loginValidation.validate(req.query) as any;
    if (error) {
        return sendError(400, error?.details[0], res);
    }
    var account = await getAccountByEmailPassword(value.email, value.password);
    if (!account)
        return sendError(400, 'Email or password not correct', res);

    const token = jwt.sign({ _id: account._id }, process.env.JWT_SECRET as string, {
        expiresIn: "4h",
    });
    sendResult({ token }, res)
}
import { Response, Request } from 'express'
import { sendError, sendResult } from '../../util/res.util'
import { initUser, insertUser } from '..//..//util/user.util'

import { eventAValidation, eventBValidation } from '../middleware/validation'
import { IUser, User } from '../model'
// [POST]/event-a/register
export const registerFormA = (req: any, res: Response) => {
    var eventId = '5349b4ddd2781d08c09890f4'
    return registerForm(req, res, eventId);
}
// [POST]/event-b/register
export const registerFormB = (req: any, res: Response) => {
    var eventId = '625acbfcab00aadccc1a6db9'
    return registerForm(req, res, eventId);
}

const registerForm = (req: any, res: Response, eventId: string) => {
    req.eventId = eventId;
    initUser(req).then((user: any) => {

        return Promise.all([User.findOne({ eventId, email: user.email }), user])
    }).then(([userOld, user]) => {
        // check email contain in event
        if (!userOld)
            return insertUser(user as IUser)
        throw ("Email already in use");

    }).then((user) => {
        sendResult(user, res)
    }).catch(e => {
        sendError(400, e, res);
    })
}
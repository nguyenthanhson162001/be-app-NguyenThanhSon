import { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { sendError, sendResult } from '../../util/res.util'
import { initUser, insertUser, isUserContain, deleteUserById } from '..//..//util/user.util'
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

// [GET]/user/list-user
export const listUserRegisterForm = (req: any, res: Response) => {
    var eventId
}

// [DELETE]/user/delete?userId=
export const deleteUser = (req: Request, res: Response) => {
    var userId = req.body.userId;
    if (!userId) {
        return sendError(400, 'Missing param userId', res);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(400, errors.array(), res);
    }
    deleteUserById(userId)
        .then((e: any) => {
            res.send(e)
        }).catch((error: any) => {
            res.send(error)
        })
}

const registerForm = (req: any, res: Response, eventId: string) => {
    req.eventId = eventId;
    initUser(req).then((user: any) => {
        return Promise.all([isUserContain, user])
    }).then(([isContain, user]) => {
        // check email contain in event
        if (!isContain)
            return insertUser(user as IUser)
        throw ("Email already in use");
    }).then((user) => {
        sendResult(user, res)
    }).catch(e => {
        sendError(400, e, res);
    })
}
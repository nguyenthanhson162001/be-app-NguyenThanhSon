import e, { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { sendError, sendResult } from '../../util/res.util'
import { getEventBySlug } from '../../util/event.util'
import { initUser, insertUserOnEvent, isUserContain, deleteUserById } from '..//..//util/user.util'
import { IEvent, IUser, User } from '../model'
import { eventAValidation, eventBValidation } from '..//..//util/valiadtion'
import 'dotenv/config'

const eventAId = process.env.EVENT_A_ID as string
const eventBId = process.env.EVENT_B_ID as string

// [GET]/user/list-user
export const listUserByEvent = (req: any, res: Response) => {

}

// [GET]/register-event/:slug
export const registerEvent = async (req: Request, res: Response) => {
    var eventSlug = req.params.slug as string
    var event = await getEventBySlug(eventSlug) as IEvent | null
    if (!event)
        return sendError(400, 'Event not found', res);
    switch (event._id.toString()) {
        case eventAId:
            var { error, value } = eventAValidation.validate(req.body);
            break;
        case eventBId:
            var { error, value } = eventBValidation.validate(req.body);
            break;
        default:
            return sendError(400, 'Event Not set up yet', res);
    }
    if (error) {
        return sendError(400, error?.details[0], res);
    }
    insertUserOnEvent(value as IUser, event._id.toString() as string)
        .then((result) => {
            return sendResult(result, res);
        }).catch((error) => {
            return sendError(400, error, res);
        })
}


// [DELETE]/user/delete?userId=
export const deleteUser = (req: Request, res: Response) => {
    var userId = req.body.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(400, errors.array(), res);
    }
    deleteUserById(userId)
        .then((e: any) => {
            var count = e.deletedCount
            if (count == 0)
                throw ('UserId not contain');
            return sendResult({ deletedCount: count }, res);
        }).catch((error: any) => {
            return sendError(400, error, res);
        })
}

const registerForm = (req: any, res: Response, eventId: string) => {
    // req.eventId = eventId;
    // initUser(req).then((user: any) => {
    //     return Promise.all([isUserContain, user])
    // }).then(([isContain, user]) => {
    //     // check email contain in event
    //     if (!isContain)
    //         return insertUser(user as IUser)
    //     throw ("Email already in use");
    // }).then((user) => {
    //     sendResult(user, res)
    // }).catch(e => {
    //     sendError(400, e, res);
    // })
}
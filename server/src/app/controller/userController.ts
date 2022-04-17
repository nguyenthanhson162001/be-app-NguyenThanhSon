import e, { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { sendError, sendResult } from '../../util/res.util'
import { getEventBySlug } from '../../util/event.util'
import { insertUserOnEvent, getListUserByEventAndOption, deleteUserById } from '..//..//util/user.util'
import { IEvent, IUser, User } from '../model'
import { eventAValidation, eventBValidation } from '..//..//util/valiadtion'
import { getOptionInRequest } from '..//..//util/pagination.util'
import 'dotenv/config'

const eventAId = process.env.EVENT_A_ID as string
const eventBId = process.env.EVENT_B_ID as string

// [GET]/user/list-user
export const listUserByEvent = async (req: Request, res: Response) => {
    const eventId = req.query.eventId
    if (!eventId || eventId?.length != 24)
        return sendError(400, 'Require evenId and correct format', res);
    var options = getOptionInRequest(req) as any
    options.query = { eventId }
    getListUserByEventAndOption(options)
        .then((result) => {
            return sendResult(result, res);
        }).catch((error) => {
            return sendError(400, error, res);
        });
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
    if (!userId || userId?.length != 24)
        return sendError(400, 'Require userId and correct format', res);
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

// [DELETE]/user/delete?userId=
export const getToken = (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(400, errors.array(), res);
    }

}
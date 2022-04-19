import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import 'dotenv/config'

import { sendError, sendResult } from '../../util/res.util'
import { getEventBySlug } from '../../util/event.util'
import { insertUserOnEvent, getListUserByEventAndOption, deleteUserById, getUserByEmailPopulated, getUserByEmail, updateUserUtil } from '..//..//util/user.util'
import { Account, IEvent, IUser, User } from '../model'
import { eventAValidation, eventBValidation, emailValidation, updateUserValidation } from '..//..//util/valiadtion'
import { getOptionInRequest } from '..//..//util/pagination.util'


const eventAId = process.env.EVENT_A_ID as string
const eventBId = process.env.EVENT_B_ID as string

// [GET]/user/list-user
export const listUserByEvent = async (req: Request, res: Response) => {
    const eventId = req.query.eventId
    if (!eventId || eventId?.length != 24)
        return sendError(400, { message: 'Require evenId and correct format' }, res);
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
        return sendError(400, { message: 'Event not found' }, res);
    switch (event._id.toString()) {
        case eventAId:
            var { error, value } = eventAValidation.validate(req.body);
            break;
        case eventBId:
            var { error, value } = eventBValidation.validate(req.body);
            break;
        default:
            return sendError(400, { message: 'Event Not set up yet' }, res);
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
        return sendError(400, { message: 'Require userId and correct format' }, res);
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



// [GET]/account/get-list-event-register?email=
export const getListEventRegisterByEmail = async (req: Request, res: Response) => {
    var { error, value } = emailValidation.validate(req.query);
    if (error) {
        return sendError(400, error?.details[0], res);
    }
    getUserByEmailPopulated(value.email).then((user) => {

        if (user) {
            return sendResult({ user: user }, res);
        }
        throw ('Email not Exist');
    }).catch((e) => {
        return sendError(400, { message: 'Email not Exist' }, res);
    })



}

// [PUT]/account/update-user
export const updateUser = async (req: Request, res: Response) => {

    var { error, value } = updateUserValidation.validate(req.body);
    if (error) {
        return sendError(400, error?.details[0], res);
    }

    var userOld = await getUserByEmail(value.email);
    if (userOld && userOld._id != value._id) {
        return sendError(400, { message: 'Email already Exist ' }, res)
    }

    updateUserUtil(value).then((e: any) => {
        var count = e.modifiedCount
        return sendResult({ modifiedCount: count }, res);
    }).catch((error: any) => {
        console.log(error)
        return sendError(400, error, res);
    })


}



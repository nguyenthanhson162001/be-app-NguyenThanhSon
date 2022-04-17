import { Request } from 'express'
import { IUser, User } from '..//app/model'
import { validationResult } from 'express-validator'
export const insertUserOnEvent = async (user: IUser, eventId: string) => {
    var userCheck = await getUserByEmail(user.email as string);
    // Create new User
    if (!userCheck) {
        user.eventId = [eventId]
        return await User.create(user)
    }

    // Check user registed event
    var listEvent = userCheck.eventId as string[]
    if (listEvent.includes(eventId)) {
        // user Registered for the event
        return Promise.reject('User Registered for the event')
    }
    listEvent.push(eventId)
    user.eventId = listEvent;

    // add event in user old
    return await User.updateOne({ email: user.email }, { ...user });
}
export const getUserByEmail = async (email: string): Promise<IUser> => {
    return await User.findOne({ email: email }) as IUser;
}
export const isUserContain = async (user: IUser): Promise<boolean> => {
    var userOld = await User.findOne({ eventId: user.eventId, email: user.email })
    if (userOld)
        return true;
    return false;
}
export const initUser = (req: any): Promise<IUser | string> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return Promise.reject(errors.array());
    }
    var { worlkLocation, lastName, firstName, email, hobbies } = req.body
    var user = {
        lastName,
        firstName,
        email,
        eventId: req.eventId
    } as IUser
    // if worlkLocation == null => make sure hobbies not null, because have validation
    if (worlkLocation) {
        user.workLocation = worlkLocation
    } else {
        user.hobbies = hobbies
    }
    return Promise.resolve(user);
}
export const deleteUserById = async (id: string) => {
    return await User.deleteOne({ _id: id })
}
import { Request } from 'express'
import { IUser, User } from '..//app/model'
import { validationResult } from 'express-validator'
export const insertUser = async (user: IUser) => {
    return await User.create(user)
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
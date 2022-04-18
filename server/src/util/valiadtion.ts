import Joi from 'joi'
// same check many event
const eventvalidationBasic = {
    lastName: Joi.string()
        .max(30)
        .required(),
    firstName: Joi.string()
        .max(30)
        .required(),
    email: Joi.string().email()
        .max(60)
        .required(),
}

export const eventAValidation = Joi.object({
    ...eventvalidationBasic,
    workLocation: Joi.string()
        .max(30)
        .required()
})
export const eventBValidation = Joi.object({
    ...eventvalidationBasic,
    hobbies: Joi.string()
        .max(200)
        .required(),
})
export const loginValidation = Joi.object({
    email: Joi.string().email()
        .max(50)
        .required(),
    password: Joi.string()
        .max(60)
        .required(),
})
export const emailValidation = Joi.object({
    email: Joi.string().email()
        .max(50)
        .required(),
})

export const updateUserValidation = Joi.object({
    ...eventvalidationBasic,
    hobbies: Joi.string()
        .max(200),

    workLocation: Joi.string()
        .max(30),

    _id: Joi.string()
        .required(),
})

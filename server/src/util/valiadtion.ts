import Joi from 'joi'
// same check many event
const eventvalidationBasic = {
    lastName: Joi.string()
        .alphanum()
        .max(30)
        .required(),
    firstName: Joi.string()
        .alphanum()
        .max(30)
        .required(),
    email: Joi.string().email()
        .max(60)
        .required(),
}

export const eventAValidation = Joi.object({
    ...eventvalidationBasic,
    hobbies: Joi.string()
        .alphanum()
        .max(200)
        .required(),
})

export const eventBValidation = Joi.object({
    ...eventvalidationBasic,
    workLocation: Joi.string()
        .alphanum()
        .max(30)
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

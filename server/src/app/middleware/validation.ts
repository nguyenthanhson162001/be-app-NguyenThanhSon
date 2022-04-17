import { NextFunction } from "express";
import { body, check } from 'express-validator';

const eventValidation = [
    body('lastName').isLength({ max: 50, min: 1 }).withMessage('Length Last name must be at least 1 and Most 50'),
    body('firstName').isLength({ max: 50, min: 1 }).withMessage('Length First name must be at least 1 and Most 50'),
    body('email').isEmail().isLength({ max: 50 }).withMessage('Length Email must be at Most 50'),

] as any;
export const eventAValidation = [
    ...eventValidation,
    body('workLocation', ' does not Empty').isLength({ max: 200, min: 1 }).withMessage('Length Worlk location must be at least 1 and Most 200'),
];
export const eventBValidation = [
    ...eventValidation,
    body('hobbies', 'Hobbies does not Empty').isLength({ max: 200, min: 1 }).withMessage('Length Hobbies must be at least 1 and Most 200'),
];

export const loginValidation = [
    body('email').isEmail().isLength({ max: 50 }).withMessage('Length Email must be at Most 50'),
    body('password').isLength({ max: 50, min: 8 })
];

export const deleteValidation = [
    body('userId').isMongoId().withMessage(`userId must be type mongoID`),
]

export const checkIdObjectMongoDB = (attName: string) => {
    return [
        body(attName).isMongoId().withMessage(`${attName} must be type mongoID`),
    ]
}
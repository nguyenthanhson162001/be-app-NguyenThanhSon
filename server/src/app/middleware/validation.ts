import { NextFunction } from "express";
import { body, check } from 'express-validator';

const eventValidation = [
    body('lastName').isLength({ max: 50, min: 1 }).withMessage('Length Last name must be at least 1 and Most 50'),
    body('firstName').isLength({ max: 50, min: 1 }).withMessage('Length First name must be at least 1 and Most 50'),
    body('Email').isEmail().isLength({ max: 50, min: 3 }).withMessage('Length Email must be at least 1 and Most 50'),
    body('eventId').not().isEmpty().isLength({ max: 24, min: 24 }).withMessage('Length eventId must be 24'),
] as any;
export const eventAValidation = [
    ...eventValidation,
    body('worlkLocation', ' does not Empty').isLength({ max: 200, min: 1 }).withMessage('Length Worlk location must be at least 1 and Most 200'),
];
export const eventBValidation = [
    ...eventValidation,
    body('hobbies', 'Hobbies does not Empty').isLength({ max: 200, min: 1 }).withMessage('Length Hobbies must be at least 1 and Most 200'),
];

export const loginValidation = [
    body('email').isEmail().isLength({ max: 50, min: 3 }).withMessage('Length Email must be at least  and Most 50'),
    body('password').isLength({ max: 50, min: 8 }).withMessage('Length password must be at least 8 and Most 50'),
];

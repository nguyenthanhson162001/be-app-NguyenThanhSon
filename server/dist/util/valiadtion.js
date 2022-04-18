"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.emailValidation = exports.loginValidation = exports.eventBValidation = exports.eventAValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// same check many event
const eventvalidationBasic = {
    lastName: joi_1.default.string()
        .max(30)
        .required(),
    firstName: joi_1.default.string()
        .max(30)
        .required(),
    email: joi_1.default.string().email()
        .max(60)
        .required(),
};
exports.eventAValidation = joi_1.default.object(Object.assign(Object.assign({}, eventvalidationBasic), { workLocation: joi_1.default.string()
        .max(30)
        .required() }));
exports.eventBValidation = joi_1.default.object(Object.assign(Object.assign({}, eventvalidationBasic), { hobbies: joi_1.default.string()
        .max(200)
        .required() }));
exports.loginValidation = joi_1.default.object({
    email: joi_1.default.string().email()
        .max(50)
        .required(),
    password: joi_1.default.string()
        .max(60)
        .required(),
});
exports.emailValidation = joi_1.default.object({
    email: joi_1.default.string().email()
        .max(50)
        .required(),
});
exports.updateUserValidation = joi_1.default.object(Object.assign(Object.assign({}, eventvalidationBasic), { hobbies: joi_1.default.string()
        .max(200), workLocation: joi_1.default.string()
        .max(30), _id: joi_1.default.string()
        .required() }));

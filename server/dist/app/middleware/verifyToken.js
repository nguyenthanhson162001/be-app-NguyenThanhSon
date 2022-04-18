"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const res_util_1 = require("../../util/res.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkToken = (req, res, next) => {
    const token = req.headers["auth-token"];
    if (!token)
        return (0, res_util_1.sendError)(400, 'missing auth-token in header', res);
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userID = verified._id;
        req.role = verified.role;
        next();
    }
    catch (error) {
        return (0, res_util_1.sendError)(400, 'Invalid token', res);
    }
};
exports.checkToken = checkToken;

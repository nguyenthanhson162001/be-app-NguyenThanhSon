"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResult = exports.sendError = void 0;
const sendError = (status, mgs, res) => {
    res.status(status).json({
        status: false,
        error: mgs
    });
};
exports.sendError = sendError;
const sendResult = (mgs, res) => {
    var result = {
        status: true
    };
    if (mgs)
        result.result = mgs;
    res.status(200).json(result);
};
exports.sendResult = sendResult;

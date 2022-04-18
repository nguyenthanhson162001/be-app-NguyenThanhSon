"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionInRequest = void 0;
const getOptionInRequest = (req) => {
    var { page, limit } = req.query;
    if (!limit || isNaN(limit))
        limit = 5;
    if (!page || isNaN(page))
        page = 1;
    return {
        limit, page
    };
};
exports.getOptionInRequest = getOptionInRequest;

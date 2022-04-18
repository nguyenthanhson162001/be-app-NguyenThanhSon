"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const res_util_1 = require("../../util/res.util");
const valiadtion_1 = require("../../util/valiadtion");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_util_1 = require("../../util/account.util");
// [DELETE]/account/delete?userId=
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { error, value } = yield valiadtion_1.loginValidation.validate(req.query);
    if (error) {
        return (0, res_util_1.sendError)(400, error === null || error === void 0 ? void 0 : error.details[0], res);
    }
    var account = yield (0, account_util_1.getAccountByEmailPassword)(value.email, value.password);
    if (!account)
        return (0, res_util_1.sendError)(400, 'Email or password not correct', res);
    const token = jsonwebtoken_1.default.sign({ _id: account._id, role: account.role }, process.env.JWT_SECRET, {
        expiresIn: "4h",
    });
    (0, res_util_1.sendResult)({ token }, res);
});
exports.getToken = getToken;

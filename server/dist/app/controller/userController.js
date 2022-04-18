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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getListEventRegisterByEmail = exports.deleteUser = exports.registerEvent = exports.listUserByEvent = void 0;
require("dotenv/config");
const res_util_1 = require("../../util/res.util");
const event_util_1 = require("../../util/event.util");
const user_util_1 = require("..//..//util/user.util");
const valiadtion_1 = require("..//..//util/valiadtion");
const pagination_util_1 = require("..//..//util/pagination.util");
const eventAId = process.env.EVENT_A_ID;
const eventBId = process.env.EVENT_B_ID;
// [GET]/user/list-user
const listUserByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.query.eventId;
    if (!eventId || (eventId === null || eventId === void 0 ? void 0 : eventId.length) != 24)
        return (0, res_util_1.sendError)(400, { message: 'Require evenId and correct format' }, res);
    var options = (0, pagination_util_1.getOptionInRequest)(req);
    options.query = { eventId };
    (0, user_util_1.getListUserByEventAndOption)(options)
        .then((result) => {
        return (0, res_util_1.sendResult)(result, res);
    }).catch((error) => {
        return (0, res_util_1.sendError)(400, error, res);
    });
});
exports.listUserByEvent = listUserByEvent;
// [GET]/register-event/:slug
const registerEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var eventSlug = req.params.slug;
    var event = yield (0, event_util_1.getEventBySlug)(eventSlug);
    if (!event)
        return (0, res_util_1.sendError)(400, { message: 'Event not found' }, res);
    switch (event._id.toString()) {
        case eventAId:
            var { error, value } = valiadtion_1.eventAValidation.validate(req.body);
            break;
        case eventBId:
            var { error, value } = valiadtion_1.eventBValidation.validate(req.body);
            break;
        default:
            return (0, res_util_1.sendError)(400, { message: 'Event Not set up yet' }, res);
    }
    if (error) {
        return (0, res_util_1.sendError)(400, error === null || error === void 0 ? void 0 : error.details[0], res);
    }
    (0, user_util_1.insertUserOnEvent)(value, event._id.toString())
        .then((result) => {
        return (0, res_util_1.sendResult)(result, res);
    }).catch((error) => {
        return (0, res_util_1.sendError)(400, error, res);
    });
});
exports.registerEvent = registerEvent;
// [DELETE]/user/delete?userId=
const deleteUser = (req, res) => {
    var userId = req.body.userId;
    if (!userId || (userId === null || userId === void 0 ? void 0 : userId.length) != 24)
        return (0, res_util_1.sendError)(400, { message: 'Require userId and correct format' }, res);
    (0, user_util_1.deleteUserById)(userId)
        .then((e) => {
        var count = e.deletedCount;
        if (count == 0)
            throw ('UserId not contain');
        return (0, res_util_1.sendResult)({ deletedCount: count }, res);
    }).catch((error) => {
        return (0, res_util_1.sendError)(400, error, res);
    });
};
exports.deleteUser = deleteUser;
// [GET]/account/get-list-event-register?email=
const getListEventRegisterByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { error, value } = valiadtion_1.emailValidation.validate(req.query);
    if (error) {
        return (0, res_util_1.sendError)(400, error === null || error === void 0 ? void 0 : error.details[0], res);
    }
    var user = yield (0, user_util_1.getUserByEmailPopulated)(value.email);
    console.log(user);
    res.json(user);
});
exports.getListEventRegisterByEmail = getListEventRegisterByEmail;
// [PUT]/account/update-user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { error, value } = valiadtion_1.updateUserValidation.validate(req.query);
    if (error) {
        return (0, res_util_1.sendError)(400, error === null || error === void 0 ? void 0 : error.details[0], res);
    }
    var userOld = yield (0, user_util_1.getUserByEmail)(value.email);
});
exports.updateUser = updateUser;

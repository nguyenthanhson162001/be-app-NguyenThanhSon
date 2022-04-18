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
exports.getListUserByEventAndOption = exports.deleteUserById = exports.isUserContain = exports.getUserByEmailPopulated = exports.getUserByEmail = exports.insertUserOnEvent = void 0;
const model_1 = require("..//app/model");
const insertUserOnEvent = (user, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    var userCheck = yield (0, exports.getUserByEmail)(user.email);
    // Create new User
    if (!userCheck) {
        user.eventId = [eventId];
        return yield model_1.User.create(user);
    }
    // Check user registed event
    var listEvent = userCheck.eventId;
    if (listEvent.includes(eventId)) {
        // user Registered for the event
        return Promise.reject({ message: 'User Registered for the event' });
    }
    listEvent.push(eventId);
    user.eventId = listEvent;
    // add event in user old7
    return yield model_1.User.updateOne({ email: user.email }, Object.assign({}, user));
});
exports.insertUserOnEvent = insertUserOnEvent;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.User.findOne({ email: email });
});
exports.getUserByEmail = getUserByEmail;
const getUserByEmailPopulated = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.User.findOne({ email: email }).populate('eventId').orFail();
});
exports.getUserByEmailPopulated = getUserByEmailPopulated;
const isUserContain = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var userOld = yield model_1.User.findOne({ eventId: user.eventId, email: user.email });
    if (userOld)
        return true;
    return false;
});
exports.isUserContain = isUserContain;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.User.deleteOne({ _id: id });
});
exports.deleteUserById = deleteUserById;
const getListUserByEventAndOption = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.User.paginate(options);
});
exports.getListUserByEventAndOption = getListUserByEventAndOption;

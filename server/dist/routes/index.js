"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accountController_1 = require("../app/controller/accountController");
const userController_1 = require("../app/controller/userController");
const verifyToken_1 = require("..//app/middleware/verifyToken");
exports.default = (app) => {
    app.post('/register-event/:slug', userController_1.registerEvent);
    app.get('/user/list-user', userController_1.listUserByEvent);
    app.delete('/user/delete', userController_1.deleteUser);
    app.get('/account/get-token', accountController_1.getToken);
    app.get('/account/get-list-event-register', verifyToken_1.checkToken, userController_1.getListEventRegisterByEmail);
    app.put('/account/update-user', verifyToken_1.checkToken, userController_1.updateUser);
};

import { getToken } from "../app/controller/accountController";
import { deleteUser, listUserByEvent, registerEvent, getListEventRegisterByEmail, updateUser } from "../app/controller/userController";
import { checkToken } from '..//app/middleware/verifyToken'

export default (app: any) => {

    app.post('/register-event/:slug', registerEvent);

    app.get('/user/list-user', listUserByEvent);

    app.delete('/user/delete', deleteUser);

    app.get('/account/get-token', getToken)

    app.get('/account/get-list-event-register', checkToken, getListEventRegisterByEmail)

    app.put('/account/update-user', checkToken, updateUser)

}
import { deleteUser, listUserByEvent, registerEvent, getToken } from "../app/controller/userController";
import { checkIdObjectMongoDB } from "../app/middleware/validation";
// import { verifyToken } from '..//app/middleware/verifyToken'

export default (app: any) => {

    app.post('/register-event/:slug', registerEvent);

    app.get('/user/list-user', listUserByEvent);

    app.delete('/user/delete', checkIdObjectMongoDB('userId'), deleteUser);

    app.get('account/get-token',getToken)

}
import { deleteUser, listUserByEvent, registerEvent } from "../app/controller/userController";
import { checkIdObjectMongoDB } from "../app/middleware/validation";

export default (app: any) => {

    app.post('/register-event/:slug', registerEvent);

    app.get('/user/list-user', listUserByEvent);

    app.delete('/user/delete', checkIdObjectMongoDB('userId'), deleteUser);
}
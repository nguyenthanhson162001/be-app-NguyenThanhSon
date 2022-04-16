import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import { connectDB } from './config/database/mongoDB'
import { Role, Account, User, Event } from './app/model'
import { eventAValidation, eventBValidation, loginValidation } from './app/middleware/validation'
import { sendError, sendResult } from './util/res.util'
import { registerFormA, registerFormB } from './app/controller/userController';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/event-a/register', eventAValidation, registerFormA);

app.post('/event-b/register', eventBValidation, registerFormB);



app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
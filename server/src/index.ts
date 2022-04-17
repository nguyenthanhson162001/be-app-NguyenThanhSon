import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import { connectDB } from './config/database/mongoDB'
import Router from './routes';
const app = express();
const port = process.env.PORT || 3000;

// connect DB mongoDB
connectDB();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Handling request 
Router(app);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
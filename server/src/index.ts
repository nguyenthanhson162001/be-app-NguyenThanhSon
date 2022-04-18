import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/database/mongoDB'
import Router from './routes';
import fs from 'fs'
import https from 'https'
const app = express();
const port = process.env.PORT || 3000;

// connect DB mongoDB
connectDB();
const options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors())

// Handling request 
Router(app);

app.get('/', (req, res) => res.send('Hello this is server!'));
https.createServer(options, app).listen(port, () => console.log(`Server app listening on port https://localhost:${port}`));

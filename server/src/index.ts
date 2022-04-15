import express from 'express';
import 'dotenv/config'
import { connectDB } from './config/database/mongoDB'

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

console.log(process.env.PORT)
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
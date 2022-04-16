import express from 'express';
import 'dotenv/config'
import { connectDB } from './config/database/mongoDB'
import { Role, Account, User, Event } from './app/model'

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    res.json({ Role: await Role.find({}) });
});

app.post('/event-a/register', async (req, res) => {
    
    res.json({ Role: await Role.find({}) });
});
app.post('/event-b/register', async (req, res) => {
    res.json({ Role: await Role.find({}) });
});

console.log(process.env.PORT)
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
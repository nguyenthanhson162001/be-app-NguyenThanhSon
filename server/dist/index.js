"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoDB_1 = require("./config/database/mongoDB");
const routes_1 = __importDefault(require("./routes"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// connect DB mongoDB
(0, mongoDB_1.connectDB)();
const options = {
    key: fs_1.default.readFileSync('ssl/key.pem'),
    cert: fs_1.default.readFileSync('ssl/cert.pem')
};
// security DOS, DDOS
const limiter = (0, express_rate_limit_1.rateLimit)({
    // 15 minutes
    windowMs: 15 * 60 * 1000,
    // limit each IP to 100 requests per windowMs
    max: 100
});
app.use(limiter);
// security filter request toxic
app.use((0, helmet_1.default)());
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((0, cors_1.default)());
// Handling request 
(0, routes_1.default)(app);
app.get('/', (req, res) => res.send('Hello this is server!'));
https_1.default.createServer(options, app).listen(port, () => console.log(`Server app listening on port https://localhost:${port}`));

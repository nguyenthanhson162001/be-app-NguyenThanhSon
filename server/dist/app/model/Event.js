"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_slug_hero_1 = __importDefault(require("mongoose-slug-hero"));
const schema = new mongoose_1.Schema({
    eventName: { type: String, required: true },
});
schema.plugin(mongoose_slug_hero_1.default, { field: 'eventName' });
exports.default = (0, mongoose_1.model)('Event', schema);

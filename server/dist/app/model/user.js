"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    hobbies: { type: String, required: false },
    workLocation: { type: String, required: false },
    eventId: [{ type: mongoose_1.Types.ObjectId, ref: 'Event' }]
}, { timestamps: true });
userSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
exports.default = (0, mongoose_1.model)('User', userSchema);

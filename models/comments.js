"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = require("mongoose");
const CommentsShema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
});
exports.Comments = (0, mongoose_1.model)('comments', CommentsShema);

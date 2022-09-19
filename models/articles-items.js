"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const mongoose_1 = require("mongoose");
const ItemsSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    anons: {
        type: String,
        required: true
    },
    fullText: {
        type: String,
        required: true
    },
});
exports.Items = (0, mongoose_1.model)('items', ItemsSchema);

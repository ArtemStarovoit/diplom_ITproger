import { Schema, model } from "mongoose"

const ItemsSchema = new Schema({
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
})

export const Items = model('items', ItemsSchema)
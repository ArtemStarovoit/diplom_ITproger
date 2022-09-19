import { Schema, model } from "mongoose"

const CommentsShema = new Schema({
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
})

export const Comments = model('comments', CommentsShema)
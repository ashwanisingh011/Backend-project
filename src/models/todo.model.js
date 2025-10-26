import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        default: false,
        // required: true // It is not require because the value will be fase at default
    }
},{timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)
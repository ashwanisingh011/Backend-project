import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getAllTodos = async(req, res)=>{
    try {
       const todos = await Todo.find({})
            return res.status(200).json(todos)
       } catch (error) {
        return res.status(400).json({message: "Could not fetch todos"})
   }
}

const createTodo = async(req, res) => {
   const {content} = req.body;
    
    if(!content || content.trim() === ""){
        return res.status(400).json({message: "Content is required"})
    }

   const todo = await Todo.create({
        content: content
   })
   


   return res.status(201).json(todo);
}

const getTodoById = async(req, res) => {
    const {id} = req.params
    const todo = await Todo.findById(id);
    try {
        if(!todo){
            return res.status(404).json({message: "Todo not found"})
        }
        return res.status(200).json(todo)
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch todo"})
    }
}


const updateTodo = async(req, res) => {
    try {
        const {id} = req.params
    const {content, complete} = req.body
    if(!content && typeof complete === 'undefined'){
        return res.status(400).json({message: "No content or completation status provided for update"})
    }
    const updateFields = {};
    if(content){
        updateFields.content = content;
    }
    if(typeof complete !== 'undefined'){
        updateFields.complete = complete;
    }
    const todo = await Todo.findByIdAndUpdate(
        id,
        {$set: updateFields},
        {new: true}
    );
    if(!todo){
        return res.status(404).json({message: "Todo not found"})
    }
    return res.status(200).json(todo)
    } catch (error) {
        console.log("Error updating todo", error);
        return res.status(500).json({message: "Failed to update the todo"})
    }
}


const deleteTodo = async(req, res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findByIdAndDelete(id)
    if(!todo){
        return res.status(404).json({message: "Todo nod found"})
    }
    return res.status(200).json(todo)
    } catch (error) {
        console.error("Error deleting todo:", error)
        return res.status(500).json({message: "Failed to delete todo"})
    }
}





export{getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo}


        
import mongoose from 'mongoose';
import router from './routes/todo.routes.js';
import express from 'express'
const app = express ();

// This is the middleware that allows our app to understand JSON
app.use(express.json());

// app.get('/', (req, res)=>{
//     res.send("Hello world");
// })

app.use("/api/v1/todos", router);

export {app}
import { Router } from 'express';
// Don't forget to import your controllers!
import { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo} from '../controllers/todo.controllers.js';

const router = Router();

// Routes for the entire collection of todos
router.route('/')
    .get(getAllTodos)   // Handles GET /api/v1/todos
    .post(createTodo);  // Handles POST /api/v1/todos

// Routes for a single, specific todo
router.route('/:id')
    .get(getTodoById)     // Handles GET /api/v1/todos/some-id
    .patch(updateTodo)    // Handles PATCH /api/v1/todos/some-id
    .delete(deleteTodo);  // Handles DELETE /api/v1/todos/some-id

export default router;
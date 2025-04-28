const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const todoSchema = require('../Schemas/todoSchema')
const Todo = new mongoose.model('Todo', todoSchema)


// get all todos
router.get('/', async (req, res) => {
    try {
        const result = await Todo.find().select({ _id: 0, __v: 0, date: 0 }).limit(3)
        // res.send(result)
        res.status(200).json({ message: 'Todos fetched successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }

})

//get one todo by id
router.get('/:id', async (req, res) => {
    try {
        await Todo.findById(req.params.id)
            .then((result) => {
                res.status(200).json({ message: 'Todo fetched successfully', result });
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error: error.message });
    }

})

//post a todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const result = await newTodo.save();
        res.send(result)
        // res.status(200).json({ message: 'Todo saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving todo', error: error.message });
    }

})

//post multiple todos
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body)
        res.status(200).json({ message: 'Todos saved successfully' });
    }
    catch (error) {
        res.status(500).json({ message: " Error saving todos", error: error.message });
    }

})

//put a todo by id
router.put('/:id', async (req, res) => {
    try {
        await Todo.updateOne({ _id: req.params.id }, {
            $set: { status: 'inactive' }
        })
        res.status(200).json({ message: 'Todo updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating todo', error: error.message });
    }
})

//put a todo by id
router.delete('/:id', async (req, res) => {
 try{
    await Todo.deleteOne({_id: req.params.id})
    res.status(200).json({ message: 'Todo deleted successfully' });
 }
 catch(error){
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
 }
})
module.exports = router
const m$todo = require('../modules/todo.module')
const { Router } = require('express')
const response = require('../helpers/response')

const TodoController = Router()

TodoController.get('/', async (req, res) => {
    const list = await m$todo.listTodo()

    response.sendResponse(res, list)
})

TodoController.get('/:user_id', async (req, res) => {
    const list = await m$todo.listTodoId(Number(req.params.user_id))

    response.sendResponse(res, list)
})

TodoController.post('/', async (req, res) => {
    const add = await m$todo.createTodo(req.body)

    response.sendResponse(res, add)
})

TodoController.put('/', async (req, res) => {
    const update = await m$todo.updateTodo(req.body)

    response.sendResponse(res, update)
})

TodoController.delete('/:id', async (req, res) => {
    const del = await m$todo.deleteTodo(Number(req.params.id))

    response.sendResponse(res, del)
})

module.exports = TodoController
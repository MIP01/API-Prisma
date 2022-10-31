const prisma = require('../helpers/database')
const joi = require('joi')

class _todo {
    listTodo = async () => {
        try {
            const list = await prisma.todo.findMany()

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listTodo todo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listTodoId = async (user_id) => {
        try {
            const list = await prisma.todo.findMany({
                where: {
                    user_id: user_id
                }
            })
            return {
                status: true,
                data: list
            }

        } catch (error) {
            console.error('listTodo todo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
    
    createTodo = async (body) => {
        try {

            const schema = joi.object({
                user_id: joi.number().required(),
                description: joi.string().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await prisma.todo.create({
                data: {
                    user_id: body.user_id,
                    description: body.description,
                    completed: 0
                }
            })

            return {
                status: true,
                data: add
            }

        } catch (error)  {
            console.error('createTodo todo module error', error)

            return {
                status: false,
                error
            }
        } 
    }

    updateTodo = async (body) => {
        try {
            const schema = joi.object({
                user_id: joi.number().required(),
                id: joi.number().required(),
                description: joi.string().required()
    
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const update = await prisma.todo.update({
                where: {
                    id: body.id
                },
                data: {
                    user_id: body.user_id,
                    description: body.description,
                    completed: 0
                }
            })

            return {
                status: true,
                data: update
            }

        } catch (error) {
            console.error('updateTodo todo module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteTodo = async (id) => {
        try {
            const schema =joi.number().required()

            const validation = schema.validate(id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }

            const del = await prisma.todo.delete({
                where: {
                    id: id
                }
            })

            return {
                status: true,
                data: del
            }
        } catch (error) {
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _todo()
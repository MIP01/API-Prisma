const prisma =require('../helpers/database')
const bcrypt = require('bcrypt')
const joi = require('joi')


class _user {
    listUser = async () => {
        try {
            const list = await prisma.user.findMany()

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUser user module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listUserId = async (id) => {
        try {
            const list = await prisma.user.findMany({
                where: {
                    id: id
                }
            })
            return {
                status: true,
                data: list
            }

        } catch (error) {
            console.error('listUserId user module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required()
            }).options({ abortEarly: false})

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const password = bcrypt.hashSync(body.password, 10)
            const add = await prisma.user.create({
                data:{
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            return {
                status: true,
                code: 201,
                date: add
            }
        } catch (error) {
            console.error('createUser user module error ', error)

            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body) => {
        try {
            const schema = joi.object({
                id: joi.number().required(),
                name: joi.string(),
                email: joi.string(),
                password: joi.string()
            }).options({ abortEarly: false})

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            if (body.password) {
                body.password = bcrypt.hashSync(body.password, 10)
            }

            const update = await prisma.user.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password
                }
            })

            return {
                status: true,
                data: update
            }

        } catch (error) {
            console.error('updateUser user module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
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

            const del = await prisma.user.delete({
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

module.exports = new _user()
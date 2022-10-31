const AuthController = require("./controllers/AuthController")
const UserController = require("./controllers/UserController")
const TodoController = require("./controllers/TodoController")

const _routes = [
    ['users', UserController],
    ['todos', TodoController],
    ['', AuthController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes
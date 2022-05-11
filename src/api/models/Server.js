/* eslint-disable global-require */
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const { createServer } = require('http')
const { dbConnection } = require('../../config/database')
const { notFound, generalErrors } = require('../middlewares')
const { socketController } = require('../controllers/sockets')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 5000
        this.server = createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
            message: 'Bonk 🔨',
        })

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            upload: '/api/upload',
        }

        // Conectar a la DB
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()

        // Sockets
        this.sockets()

        // Middlewares de errores
        this.errorsHandlers()
    }

    // eslint-disable-next-line class-methods-use-this
    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Helmet
        this.app.use(helmet())

        // Limiter - Apply the rate limiting middleware to all requests
        this.app.use(this.limiter)

        // Morgan logger
        this.app.use(morgan('tiny'))

        // Body parser de Express
        this.app.use(express.json()) // parsea application/json
        this.app.use(express.urlencoded({ extended: false })) // parsea application/x-www-form-urlencoded

        // Directorio público
        this.app.use(express.static('public'))

        // Express fileupload
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        )
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.upload, require('../routes/upload'))
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io))
    }

    errorsHandlers() {
        this.app.use(notFound, generalErrors)
    }

    listen() {
        // this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`)); // no tiene sockets
        this.server.listen(this.port, () =>
            // eslint-disable-next-line no-console
            console.log(`Listening on port ${this.port}`)
        ) // tiene sockets
    }
}

module.exports = Server

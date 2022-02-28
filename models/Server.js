const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');
const { dbConnection } = require('../database/config');
const { notFound, generalErrors } = require('../middlewares');
const { socketController } = require('../controllers/sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            upload: '/api/upload'
        };

        //Conectar a la DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        //Sockets
        this.sockets();

        //Middlewares de errores
        this.errorsHandlers();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Body parser de Express
        this.app.use(express.json()); //parsea application/json
        this.app.use(express.urlencoded({extended: false})); // parsea application/x-www-form-urlencoded

        //Directorio público
        this.app.use(express.static('public'));

        //Express fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.upload, require('../routes/upload'));
    }

    sockets() {
        this.io.on("connection", ( socket ) => socketController(socket, this.io));
    }

    errorsHandlers() {
        this.app.use(notFound, generalErrors)
    }

    listen() {
        // this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`)); //no tiene sockets
        this.server.listen(this.port, () => console.log(`Listening on port ${this.port}`)); //tiene sockets
    }
}

module.exports = Server;
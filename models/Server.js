const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.authPath = '/api/auth';
        this.usersPath = '/api/users';

        //Conectar a la DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Body parser de Express
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }
}

module.exports = Server;
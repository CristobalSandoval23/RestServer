const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            uploads: '/api/upload',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }

        this.conectarDB();

        this.middlewares();

        this.routes();

        this.sockets();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:'/tmp/',
            createParentPath: true
        }))
    }

    routes(){
       this.app.use(this.paths.auth, require('../routes/auth'))
       this.app.use(this.paths.buscar, require('../routes/buscar'))
       this.app.use(this.paths.uploads, require('../routes/uploads'))
       this.app.use(this.paths.categorias, require('../routes/categorias'))
       this.app.use(this.paths.productos, require('../routes/productos'))
       this.app.use(this.paths.usuarios, require('../routes/user'))
    }

    sockets() {
        this.io.on('connection', (socket)=> socketController(socket, this.io))
    }

    listen() {
        this.server.listen(this.port, () =>{
            console.log('como estan', this.port);
        })
    }

}

module.exports = Server;
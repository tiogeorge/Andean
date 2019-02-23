const express       = require('express');
const cors          = require('cors');
const morgan        = require('morgan');
const app           = express();
const mysql         = require('mysql');
const myConnection  = require('express-myconnection');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const mongoose      = require('./config/database');
const MongoStore    = require('connect-mongo')(session);
const jwt           = require('jsonwebtoken');
const socketIO      = require('socket.io');
const https         = require('https');

// Certificate
/*const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.smarket.com.pe/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.smarket.com.pe/cert.pem', 'utf8');
const ca = fs.readFileSync(' /etc/letsencrypt/live/www.smarket.com.pe/fullchain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
*/

// Setting
app.set('port',process.env.PORT || 3000);

var config = require('./config/mysql')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port, 
    database: config.database.db
}
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'))

// Middlewares
app.use('/imagenes', express.static('imagenes'));
app.use(cors({origin: ['www.smarket.com.pe','https://www.smarket.com.pe','http://www.localhost:4200','http://localhost:4200','http://localhost:4201'], credentials : true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'andeantechnology',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        autoReconnect: true
    })
}));

// Routes
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/imagenes', require('./routes/imagen.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/chat', require('./routes/chat.routes'));
app.use('/api/dir', require('./routes/direccion.routes'));
app.use('/api/articulos', require('./routes/articulo.routes'));
app.use('/api/re', require('./routes/region.routes'));
app.use('/api/marca',require('./routes/marca.routes'));
app.use('/api/caracteristica', require('./routes/caracteristica.route'));
app.use('/api/distribuidor',require('./routes/distribuidor.routes'));
app.use('/api/tienda', require('./routes/tienda.routes'));
app.use('/api/precio', require('./routes/precio.routes'));
app.use('/api/sesion', require('./routes/sesion.routes'));
app.use('/api/pago', require('./routes/pago.routes'));
app.use('/api/valoracion', require('./routes/valoracion.routes'));
app.use('/api/facturacion', require('./routes/facturacion.route'));
app.use('/api/pasarela', require('./routes/pasarela.route'));

process.on('uncaughtException', function(err) {
    console.log(err);
});


// Iniciar servidor
/*const httpsServer = https.createServer(credentials, app);
httpsServer.listen(app.get('port'), () => {
	console.log('HTTPS Server running on port 443');
});*/
const server = app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto ',app.get('port'));
});

// socket IO
const io = socketIO(server);
var user = "";

// web sockets
io.on('connection',(socket)=>{
    console.log("Nueva Conexion ID : "+socket.id);

    socket.on('init-chat',(data)=>{      
        console.log(data);  
        io.sockets.emit("init-admin",data);
    });
    socket.on('join-chat', (data) => {
        console.log(data);
        io.sockets.emit(data.destino, data);
    });
    socket.on('chat-admin',(data)=> {
        console.log(data);
        io.sockets.emit(data.destino, data);
    });
    socket.on('desconectar', (data) => {
        console.log('Cliente desconectado');
        io.sockets.emit(data.destino, data);
    });
})

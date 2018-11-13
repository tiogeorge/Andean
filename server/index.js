const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');
const myConnection  = require('express-myconnection');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('./config/database');
const MongoStore = require('connect-mongo')(session);

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
app.use(cors({origin: '*'}));
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

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto ',app.get('port'));
});
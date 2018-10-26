const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const {mongoose} = require('./config/database');
// Setting
app.set('port',process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/usuarios', require('./routes/usuario.routes'));

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto ',app.get('port'));
});
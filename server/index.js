const express = require('express');
const morgan = require('morgan');
const app = express();

const {mongoose} = require('./config/database');
// Setting
app.set('port',process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto ',app.get('port'));
});
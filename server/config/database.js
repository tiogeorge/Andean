const mongoose = require('mongoose');
const URI = 'mongodb://el_ornitorrinco:1nadando@ds241723.mlab.com:41723/andeanstore';

mongoose.connect(URI)
.then(db => console.log('Base de datos esta conectada..'))
.catch(err=> console.log(err));

module.exports = mongoose;


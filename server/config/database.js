const mongoose = require('mongoose');
const URI = 'mongodb://localhost/andeanstore';

mongoose.connect(URI)
.then(db => console.log('Base de datos esta conectada..'))
.catch(err=> console.log(err));

module.exports = mongoose;
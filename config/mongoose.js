const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function(){
    console.log("Successfully connected to Database");
})

module.exports = db;
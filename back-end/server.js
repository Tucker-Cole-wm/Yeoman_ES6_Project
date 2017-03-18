/*
Author: Cole Tucker
Date: 3/2/17
File: main.html
Description: Main view for the home page

3/2 CT - Created the abilty to record messages on a console.log
3/6 CT - Made the front end text send to the console
         Created the mongodb server
         Added mongoose
3/8 CT - Commented out insert into MongoDB, encapsulated the message for Mongoose
         Added function to retrieve messages from database
         Previous messages now show up in the browser
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Message = require('./models/Message');
var auth = require('./controllers/auth');
var port = 8080;
var cores = require('./services/cores');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');


// Uses JSON to request body data
app.use(bodyParser.json());

//Fixing CORES errors
app.use(cores);

// Get messages to appear on the webpage
app.get('/api/message', message.get);
app.post('/api/message', checkAuthenticated, message.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

// Connect to the database
mongoose.connect('mongodb://localhost:27017/test', function(err) {
    // If you can connect to the database, it will be logged in the terminal.
    if (!err) {
        console.log('Connected to MongoDB.');
    }
})

// Log what port you are using
var server = app.listen(port, function() {
    console.log('Server listening on localhost:%s', port);
});

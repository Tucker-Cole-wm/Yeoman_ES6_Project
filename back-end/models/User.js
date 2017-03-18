var mongoose = require('mongoose');

// Schema & model
module.exports = mongoose.model('User', {
    email: String,
    pwd: String
});

var mongoose = require('mongoose');

// Schema & model
module.exports = mongoose.model('Message', {
    msg: String,
    user: {
        type: mongoose.Schema.ObjectId,
              ref: 'User'
    }
});

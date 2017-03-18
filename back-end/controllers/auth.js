var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    register: function(req, res) {
        console.log(req.body);

        User.findOne({
            email: req.body.email
        }, function(err, existingUser) {
            if (existingUser) {
                return res.status(409).send({
                    message: 'Email is already registered'
                });
            }
            var user = new User(req.body);
            user.save(function(err, result) {
                if (err) {
                    return res.status(500).send({
                        message: err.message
                    });
                }
                res.status(200).send({
                    token: createToken(result)
                });
            });
        })
    },

    login: function(req, res) {
        User.findOne({
            email: req.body.email
        }).exec(function(err, user) {
            if (!user) {
                return res.status(401).send({
                    message: "Email invalid"
                });
            }

            if (req.body.pwd == user.pwd) {
                console.log(req.body, user.pwd);
                res.status(200).send({
                    token: createToken(user)
                });
            } else {
                return res.status(401).send({
                    message: "Password Invalid"
                });
            }
        });
    }
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, 'secret');
}

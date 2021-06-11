const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    username: {
        type: String,
        required: [true, "Username can't be blank"]
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"]
    },
});

module.exports = mongooose.model('User', userSchema)
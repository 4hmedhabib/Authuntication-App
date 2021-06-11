const mongooose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.statics.findAndValidate = (async function(username, password) {
    const foundUser = await this.findOne({ username });
    if (foundUser) {
        const isValidate = await bcrypt.compare(password, foundUser.password);
        return isValidate ? foundUser : false
    }
});

userSchema.pre('save', async(next) => {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongooose.model('User', userSchema)
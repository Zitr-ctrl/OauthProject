const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    googleId: String

});

module.exports = mongooes.mongoose.model('User', userSchema);
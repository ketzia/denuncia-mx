var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: true
    },
    apellidoMaterno: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

module.exports = mongoose.model('User',userSchema);
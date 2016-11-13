var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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
        required: true,
        unique: true
    },
    nombreUsuario: {
        type: String,
        required: true,
        unique:true
    },
    tipoUsuario:{
        type: String,
        required: true,
        default: 'usuario'
    },
    delegacion:{
        type: Schema.Types.ObjectId, ref: 'Delegacion',
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    if(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    }
};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
       _id: this._id,
        email: this.email,
        nombre: this.nombre,
        nombreUsuario: this.nombreUsuario,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        exp: parseInt(expiry.getTime() / 1000)
    },"MY_SECRET");
};


module.exports = mongoose.model('User',userSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var delegacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefonoDelegacion: {
        type: Number,
        required: true
    },
    telefonoServicios:{
        type: Number,
        required:true
    },
    telefonoSeguridad:{
        type: Number,
        required: true
    },
    telefonoProteccionCivil:{
        type: Number,
        required: true
    },
    domicilio:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Delegacion',delegacionSchema);
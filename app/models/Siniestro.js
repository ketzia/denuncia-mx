var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var siniestroSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type:String,
        required :true
    },
    delegacion: {
        type:  Schema.Types.ObjectId, ref: 'Delegacion',
        required: true
    },
    usuarioCreador: {
        type:  Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    categoria: {
        type:  Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    domicilio: {
        type:  String,
        required: true
    },
    fechaCreacion :{
        type: Date,
        default: Date.now,
        required: true
    },
    fechaIncidente :{
        type:  Date,
        required: true
    }
});

module.exports = mongoose.model('Siniestro',siniestroSchema);
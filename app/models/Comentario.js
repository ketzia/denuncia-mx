var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var comentarioSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    usuarioCreador: {
        type:  Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    siniestro:{
        type: Schema.Types.ObjectId, ref: 'Siniestro',
        required: true
    },
    urlImagen:{
        type: String,
        required:false
    },
    fechaCreacion :{
        type: Date,
        default: Date.now,
        required: true
    }

});
module.exports = mongoose.model('Comentario',comentarioSchema);
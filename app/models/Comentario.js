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

    fechaCreacion :{
        type: { type: Date, default: Date.now },
        required: true
    }


});
module.exports = mongoose.model('Comentario',comentarioSchema);
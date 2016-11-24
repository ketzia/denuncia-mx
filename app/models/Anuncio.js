var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var anuncioSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type:String,
        required :true
    },
    delegacion: {
        type:  Schema.Types.ObjectId, ref: 'Delegacion',
        required: true
    }
});

module.exports = mongoose.model('Anuncio',anuncioSchema);
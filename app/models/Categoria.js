var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type:String,
        required :true
    }
});
module.exports = mongoose.model('Categoria',categoriaSchema);
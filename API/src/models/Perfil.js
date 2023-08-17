const mongoose = require('mongoose');
const {Schema} = mongoose;


const PerfilSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    estado: {type: String, default: "ACTIVO"},
    fecha: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Perfil', PerfilSchema);
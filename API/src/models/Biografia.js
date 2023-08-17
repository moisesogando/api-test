const mongoose = require('mongoose');
const {Schema} = mongoose;


const BiografiaSchema = new Schema({
    perfilId: {type: mongoose.Schema.Types.ObjectId, required: true},
    descripcion: {type: String, required: true},
    estado: {type: String, default: "ACTIVO"},
    fecha: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Biografia', BiografiaSchema);
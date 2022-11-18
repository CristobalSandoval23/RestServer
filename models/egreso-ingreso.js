const {Schema, model} = require('mongoose');

const EgresoIngresoSchema = Schema({
    tipo: {
        type: String,
        required: true,
        default:'GASTO',
        emun: ["INGRESO", "GASTO"]
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    valor: {
        type: Number,
        default: 0
    },
    fecha:{
        type: String,
        default:Date.now()
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
});

EgresoIngresoSchema.methods.toJSON = function() {
    const {__v, _id, estado,...data} = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model('EgresoIngreso', EgresoIngresoSchema);
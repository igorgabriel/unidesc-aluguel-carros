const mongoose = require("mongoose")

const locacaoSchema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    veiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veiculo',
        required: true
    },
    dias: {
        type: Number,
        required: true
    },
    precoTotal: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Locacao', locacaoSchema)
const mongoose = require('mongoose')

const veiculoSchema = mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: false
    },
    placa: {
        type: String,
        required: true
    },
    fabricacao: {
        type: Number,
        required: false
    },
    precoDiaria: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Veiculo', veiculoSchema)
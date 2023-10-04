const mongoose = require('mongoose')

const clienteSchema = mongoose.Schema({
    cpf: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    telefone: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('Cliente', clienteSchema)
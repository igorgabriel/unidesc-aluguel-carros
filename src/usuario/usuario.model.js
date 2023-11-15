const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: function (v) { 
            return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v); }, 
            message: props => `${props.value} não é um e-mail válido!` 
        }
    },
    senha: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)
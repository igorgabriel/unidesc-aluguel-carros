const Usuario = require('./usuario.model')
const bcrypt = require('bcrypt')

const salvar = async (req, res, next) => {
    try {
        const data = req.body

        const senha = await bcrypt.hash(data.senha, 10)
        data.senha = senha

        const usuario = new Usuario(data)
        const usuarioSalvo = await usuario.save()
        if (!usuarioSalvo) {
            throw new Error('Ocorreu um erro ao salvar o cliente')
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
    } catch (err) {
        next(err)
    }
}

const listar = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find()
        if (usuarios) {
            for (let usuario of usuarios) {
                usuario.senha = undefined
            }
        }
        res.json(usuarios)
    } catch (err) {
        next(err)
    }
}

const buscarPorId = async (req, res, next) => {
    try {
        const id = req.params.id

        const usuario = await Usuario.findById(id)

        if (!usuario) {
            throw new Error(`Usuário com o id ${id} não encontrado`)
        }

        usuario.senha = undefined

        res.json(usuario)
    } catch (err) {
        next(err)
    }
}

const alterar = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const usuario = await Usuario.findById(id)
        if (!usuario) {
            throw new Error(`Cliente com o id ${id} não encontrado`)
        }

        if (!data.senha) {
            data.senha = usuario.senha
        } else {
            const senha = await bcrypt.hash(data.senha, 10)
            data.senha = senha
        }

        const usuarioAlterado = await Usuario.findByIdAndUpdate(id, data, { new: true })
        usuarioAlterado.senha = undefined

        res.json(usuarioAlterado)
    } catch (err) {
        next(err)
    }
}

const excluir = async (req, res, next) => {
    try {
        const id = req.params.id

        const query = await Usuario.findByIdAndDelete(id)
        if (!query) {
            throw new Error(`Usuario com o id ${id} não encontrado`)
        }
        res.json({ message: `Usuário com o id ${id} foi excluído` })
    } catch (err) {
        next(err)
    }
}

const autenticacao = async (req, res, next) => {
    try {
        const { email, senha } = req.body
        if (!(email && senha)) {
            throw new Error('E-mail e senha são obrigatórios')
        }

        const usuario = Usuario.find({ email })
        if (!(usuario && (await bcrypt.compare(senha, usuario.senha)))) {
            throw new Error('E-mail ou senha inválidos')
        } 

        // const token = 

    } catch (err) {
        next(err)
    }
}

module.exports = {
    salvar,
    listar,
    buscarPorId,
    alterar,
    excluir
}
const Cliente = require('./cliente.model')

const salvar = async (req, res, next) => {
    try {
        const data = req.body
        const cliente = new Cliente(data)
        const clienteSalvo = await cliente.save()
        if (!clienteSalvo) {
            throw new Error('Ocorreu um erro ao salvar o cliente')
        }
        res.status(201).json({ message: 'Cliente cadastrado com sucesso' })
    } catch (err) {
        next(err)
    }
}

const listar = async (req, res, next) => {
    try {
        const clientes = await Cliente.find()
        res.json(clientes)
    } catch (err) {
        next(err)
    }
}

const buscarPorId = async (req, res, next) => {
    try {
        const id = req.params.id

        const cliente = await Cliente.findById(id)

        if (!cliente) {
            throw new Error(`Cliente com o id ${id} não encontrado`)
        }

        res.json(cliente)
    } catch (err) {
        next(err)
    }
}

const alterar = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const cliente = await Cliente.findById(id)
        if (!cliente) {
            throw new Error(`Cliente com o id ${id} não encontrado`)
        }

        const clienteAlterado = await Cliente.findByIdAndUpdate(id, data, { new: true })
        res.json(clienteAlterado)
    } catch (err) {
        next(err)
    }
}

const excluir = async (req, res, next) => {
    try {
        const id = req.params.id

        const query = await Cliente.findByIdAndDelete(id)
        if(!query) {
            throw new Error(`Cliente com o id ${id} não encontrado`)
        }
        res.json({message: `Cliente com o id ${id} foi excluído`})
    } catch(err) {
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
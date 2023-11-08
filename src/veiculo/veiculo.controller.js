const Veiculo = require('./veiculo.model')

const salvar = async (req, res, next) => {
    try {
        const data = req.body
        const veiculo = new Veiculo(data)
        const veiculoSalvo = await veiculo.save()
        if (!veiculoSalvo) {
            throw new Error('Ocorreu um erro ao salvar o veículo')
        }
        res.status(201).json({ message: 'Veículo cadastrado com sucesso' })
    } catch (err) {
        next(err)
    }
}

const listar = async (req, res, next) => {
    try {
        const veiculos = await Veiculo.find()
        res.json(veiculos)
    } catch (err) {
        next(err)
    }
}

const buscarPorId = async (req, res, next) => {
    try {
        const id = req.params.id

        const veiculo = await Veiculo.findById(id)

        if (!veiculo) {
            throw new Error(`Veículo com o id ${id} não encontrado`)
        }

        res.json(veiculo)
    } catch (err) {
        next(err)
    }
}

const alterar = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const veiculo = await Veiculo.findById(id)
        if (!veiculo) {
            throw new Error(`Veículo com o id ${id} não encontrado`)
        }

        const veiculoAlterado = await Veiculo.findByIdAndUpdate(id, data, { new: true })
        res.json(veiculoAlterado)
    } catch (err) {
        next(err)
    }
}

const excluir = async (req, res, next) => {
    try {
        const id = req.params.id

        const query = await Veiculo.findByIdAndDelete(id)
        if(!query) {
            throw new Error(`Veículo com o id ${id} não encontrado`)
        }
        res.json({message: `Veículo com o id ${id} foi excluído`})
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
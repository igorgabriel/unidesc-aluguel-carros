const Locacao = require('./locacao.model')
const Veiculo = require('../veiculo/veiculo.model')

const salvar = async (req, res, next) => {
    try {
        const data = req.body

        const locacao = new Locacao(data)
        locacao.precoTotal = await calculaPrecoTotal(data.dias, data.veiculo)

        const locacaoSalva = await locacao.save()
        if (!locacaoSalva) {
            throw new Error('Ocorreu um erro ao salvar a locaçao')
        }
        res.status(201).json({ message: 'Locaçao cadastrada com sucesso' })
    } catch (err) {
        next(err)
    }
}

const listar = async (req, res, next) => {
    try {
        const locacoes = await Locacao.find().populate('cliente').populate('veiculo')
        res.json(locacoes)
    } catch (err) {
        next(err)
    }
}

const buscarPorId = async (req, res, next) => {
    try {
        const id = req.params.id

        const locacao = await Locacao.findById(id).populate('cliente').populate('veiculo')

        if (!locacao) {
            throw new Error(`Locaçao com o id ${id} não encontrada`)
        }

        res.json(locacao)
    } catch (err) {
        next(err)
    }
}

const alterar = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const locacao = await Locacao.findById(id)

        if (!locacao) {
            throw new Error(`Locaçao com o id ${id} não encontrada`)
        }

        data.precoTotal = await calculaPrecoTotal(data.dias, data.veiculo)

        const locacaoAlterada = await Locacao.findByIdAndUpdate(id, data, { new: true }).populate('cliente').populate('veiculo')
        res.json(locacaoAlterada)
    } catch (err) {
        next(err)
    }
}

const excluir = async (req, res, next) => {
    try {
        const id = req.params.id

        const query = await Locacao.findByIdAndDelete(id)
        if (!query) {
            throw new Error(`Locaçao com o id ${id} não encontrada`)
        }
        res.json({ message: `Locaçao com o id ${id} foi excluída` })
    } catch (err) {
        next(err)
    }
}

const calculaPrecoTotal = async (dias, veiculoId) => {
    const veiculo = await Veiculo.findById(veiculoId)
    //Calcular o preço total
    const precoTotal = dias * veiculo.precoDiaria

    return precoTotal
}

module.exports = {
    salvar,
    listar,
    buscarPorId,
    alterar,
    excluir
}
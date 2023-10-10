const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const Cliente = require('./cliente.model')
const port = 3000

const baseUrl = '/api'

app.use(bodyParser.json())

app.get(baseUrl, (req, res) => {
    res.send('API is OK')
})

app.post(`${baseUrl}/v1/clientes`, async (req, res, next) => {
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

})

app.get(`${baseUrl}/v1/clientes`, async (req, res, next) => {
    try {
        const clientes = await Cliente.find()
        res.json(clientes)
    } catch (err) {
        next(err)
    }
})

app.get(`${baseUrl}/v1/clientes/:id`, async (req, res, next) => {
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
})

app.put(`${baseUrl}/v1/clientes/:id`, async (req, res, next) => {
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
})

app.delete(`${baseUrl}/v1/clientes/:id`, async (req, res, next) => {
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
})


app.use((err, req, res, next) => {
    console.error(`err: ${err}`)
    res.status(500).json({ errorMessage: err.message })
})

app.listen(port, () => console.log(`aluguel-carros-api running on port ${port}`))
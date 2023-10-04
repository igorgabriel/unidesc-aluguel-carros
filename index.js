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

app.use((err, req, res, next) => {
    console.error(`err: ${err}`)
    res.status(500).json({ errorMessage: err.message })
})

app.listen(port, () => console.log(`aluguel-carros-api running on port ${port}`))